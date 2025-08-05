import { Sparkles, Key, Shield, Brain, Laptop, BarChart } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: 'Instant AI Summaries',
      description: 'Get comprehensive book summaries in seconds, capturing the essence of any title with unparalleled accuracy.',
    },
    {
      icon: <Key className="w-8 h-8 text-primary" />,
      title: 'Unlock Hidden Gems',
      description: 'Discover personalized insights, memorable quotes, and key themes that resonate with your goals and interests.',
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: 'Uncompromised Privacy',
      description: 'Enterprise-grade security protects your data and reading preferences with end-to-end encryption.',
    },
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: 'Smart Recommendations',
      description: 'AI-powered suggestions based on your reading history, interests, and goals.',
    },
    {
      icon: <Laptop className="w-8 h-8 text-primary" />,
      title: 'Cross-Platform Sync',
      description: 'Access your library and insights anywhere, anytime on all your devices.',
    },
    {
      icon: <BarChart className="w-8 h-8 text-primary" />,
      title: 'Reading Analytics',
      description: 'Track your reading habits, comprehension, and knowledge growth over time.',
    },
  ];

  return (
    <section id="features" className="py-8 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-[2.8rem] font-bold font-heading mb-8 relative pb-2">
            Elevate Your Reading Experience
            <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-accent rounded"></span>
          </h2>
          <p className="text-lg text-muted-foreground">
            BookAI Pro transforms how you consume knowledge with cutting-edge AI technology designed for modern readers.
          </p>
        </div>
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative feature-card cursor-pointer"
              
            >
              <div className="w-16 h-16 bg-purple-600/10 rounded-2xl flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold font-heading mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}