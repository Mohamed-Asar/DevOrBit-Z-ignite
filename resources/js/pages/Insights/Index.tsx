import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Sparkles, Loader2 } from 'lucide-react';

export default function InsightsIndex() {
    const [insights, setInsights] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [generated, setGenerated] = useState(false);

    const generate = async () => {
        setLoading(true);
        // Simulate AI request for prototype
        setTimeout(() => {
            setInsights([
                "Consider increasing manager headcount to maintain a comfortable 1:5 ratio with employees based on current growth trajectory.",
                "Login inactivity spikes on weekends. Consider gamifying weekend log-ins to boost engagement.",
                "A large proportion of users were created recently, suggesting successful onboarding but you must monitor 30-day retention."
            ]);
            setGenerated(true);
            setLoading(false);
        }, 1500);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'AI Insights', href: '/insights' }]}>
            <Head title="AI Insights" />
            <div className="space-y-6 animate-fade-in p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">AI Smart Insights</h1>
                        <p className="text-muted-foreground text-sm mt-1">AI-powered analysis of your platform data</p>
                    </div>
                    <Button className="btn-gradient" onClick={generate} disabled={loading}>
                        {loading ? (
                            <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing...</>
                        ) : (
                            <><Sparkles className="h-4 w-4 mr-2" /> Generate Insights</>
                        )}
                    </Button>
                </div>

                {!generated && !loading && (
                    <Card className="card-elevated border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-16">
                            <div className="h-16 w-16 rounded-2xl bg-accent flex items-center justify-center mb-4">
                                <Brain className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">No insights generated yet</h3>
                            <p className="text-muted-foreground text-sm text-center max-w-md">
                                Click "Generate Insights" to analyze your platform data with AI and get actionable recommendations.
                            </p>
                        </CardContent>
                    </Card>
                )}

                {loading && (
                    <div className="grid gap-4">
                        {[1, 2, 3].map(i => (
                            <Card key={i} className="card-elevated animate-pulse">
                                <CardContent className="py-6">
                                    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                                    <div className="h-4 bg-muted rounded w-1/2" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {generated && !loading && (
                    <div className="grid gap-4">
                        {insights.map((insight, i) => (
                            <Card key={i} className="card-elevated animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                                <CardContent className="py-5">
                                    <div className="flex items-start gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Sparkles className="h-4 w-4 text-primary" />
                                        </div>
                                        <p className="text-foreground leading-relaxed">{insight}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
