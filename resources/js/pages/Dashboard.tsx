import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { KPICard } from '@/components/kpi-card';
import { Users, ShieldCheck, Briefcase, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Legend, Area, AreaChart
} from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
];

export default function Dashboard({ kpis, distribution, monthly }: any) {
    const { auth } = usePage().props;
    const userRole = auth.user.roles && auth.user.roles.length > 0 ? auth.user.roles[0] : 'User';

    const chartTooltipStyle = {
        backgroundColor: 'hsl(var(--card))',
        border: '1px solid hsl(var(--border) / 0.5)',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 500,
        boxShadow: '0 8px 24px -4px hsl(224 40% 10% / 0.12)',
        padding: '8px 12px',
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6 animate-fade-in">
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground text-sm mt-1.5">
                        {userRole === 'Super Admin'
                            ? 'Full platform overview'
                            : userRole === 'Admin'
                                ? 'Administrative overview'
                                : userRole === 'Manager'
                                    ? 'Team management overview'
                                    : 'Your activity overview'}
                    </p>
                </div>

                {/* KPI Cards */}
                {kpis && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <KPICard title="Total Users" value={kpis.totalUsers} icon={Users} trend="+12% this month" iconClassName="bg-primary/10" />
                        <KPICard title="Admins" value={kpis.totalAdmins} icon={ShieldCheck} iconClassName="bg-destructive/10" />
                        <KPICard title="Managers" value={kpis.totalManagers} icon={Briefcase} iconClassName="bg-warning/10" />
                        <KPICard title="Employees" value={kpis.totalEmployees} icon={UserCheck} trend="+3 this week" iconClassName="bg-success/10" />
                    </div>
                )}

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="card-elevated border-border/40 rounded-2xl overflow-hidden">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">User Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={distribution} barCategoryGap="20%">
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.4)" vertical={false} />
                                    <XAxis dataKey="role" tick={{ fontSize: 12, fontWeight: 600 }} stroke="hsl(var(--muted-foreground) / 0.5)" axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground) / 0.5)" axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={chartTooltipStyle} cursor={{ fill: 'hsl(var(--primary) / 0.04)' }} />
                                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="card-elevated border-border/40 rounded-2xl overflow-hidden">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">Monthly Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={280}>
                                <AreaChart data={monthly}>
                                    <defs>
                                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                                            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorLogins" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity={0.2} />
                                            <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.4)" vertical={false} />
                                    <XAxis dataKey="month" tick={{ fontSize: 12, fontWeight: 600 }} stroke="hsl(var(--muted-foreground) / 0.5)" axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground) / 0.5)" axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={chartTooltipStyle} />
                                    <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 600 }} />
                                    <Area type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#colorUsers)" dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--card))' }} />
                                    <Area type="monotone" dataKey="logins" stroke="hsl(var(--success))" strokeWidth={2.5} fill="url(#colorLogins)" dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--card))' }} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
