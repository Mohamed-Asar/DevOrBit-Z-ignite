import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Download, Filter } from 'lucide-react';
import { toast } from 'sonner';

const ROLES = ['Super Admin', 'Admin', 'Manager', 'Employee'];
const ROLE_LABELS: Record<string, string> = {
    'Super Admin': 'Super Admin',
    'Admin': 'Administrator',
    'Manager': 'Manager',
    'Employee': 'Employee'
};

export default function ReportsIndex() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [report, setReport] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);

    const generateReport = async () => {
        setLoading(true);
        // Simulate an API call to the backend ReportController for the hackathon prototype
        setTimeout(() => {
            setReport({
                total: 2,
                byRole: { 'Super Admin': 1, 'Employee': 1 },
                users: [
                    { id: 1, name: 'John Admin', email: 'admin@test.com', role: 'Super Admin', created_at: new Date().toISOString() },
                    { id: 2, name: 'Jane Emp', email: 'emp@test.com', role: 'Employee', created_at: new Date().toISOString() }
                ]
            });
            setLoading(false);
        }, 800);
    };

    const exportCSV = () => {
        if (!report) return;
        const headers = 'Name,Email,Role,Created At\n';
        const rows = report.users.map((u: any) => `${u.name},${u.email},${ROLE_LABELS[u.role]},${new Date(u.created_at).toLocaleDateString()}`).join('\n');
        const blob = new Blob([headers + rows], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'report.csv';
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Report exported successfully');
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Reports', href: '/reports' }]}>
            <Head title="Reports" />
            <div className="space-y-6 animate-fade-in p-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Reports</h1>
                    <p className="text-muted-foreground text-sm mt-1">Generate and export filtered reports</p>
                </div>

                {/* Filters */}
                <Card className="card-elevated">
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <Filter className="h-4 w-4" /> Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Role</Label>
                                <Select value={roleFilter} onValueChange={setRoleFilter}>
                                    <SelectTrigger><SelectValue placeholder="All roles" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Roles</SelectItem>
                                        {ROLES.map(r => <SelectItem key={r} value={r}>{ROLE_LABELS[r]}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-end">
                                <Button className="btn-gradient w-full" onClick={generateReport} disabled={loading}>
                                    {loading ? 'Generating...' : 'Generate Report'}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Report Results */}
                {report && (
                    <>
                        {/* Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                            <Card className="kpi-card">
                                <CardContent className="pt-4">
                                    <p className="text-sm text-muted-foreground">Total</p>
                                    <p className="text-2xl font-bold text-foreground">{report.total}</p>
                                </CardContent>
                            </Card>
                            {Object.entries(report.byRole).map(([role, count]) => (
                                <Card key={role} className="kpi-card">
                                    <CardContent className="pt-4">
                                        <p className="text-sm text-muted-foreground">{ROLE_LABELS[role]}</p>
                                        <p className="text-2xl font-bold text-foreground">{count as number}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Table + Export */}
                        <Card className="card-elevated overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-base">Results</CardTitle>
                                <Button variant="outline" size="sm" onClick={exportCSV}>
                                    <Download className="h-4 w-4 mr-2" /> Export CSV
                                </Button>
                            </CardHeader>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Created</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {report.users.map((user: any) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">{user.name}</TableCell>
                                            <TableCell className="text-muted-foreground">{user.email}</TableCell>
                                            <TableCell><Badge variant="outline">{ROLE_LABELS[user.role]}</Badge></TableCell>
                                            <TableCell className="text-muted-foreground text-sm">{new Date(user.created_at).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </>
                )}
            </div>
        </AppLayout>
    );
}
