
export default function Testimonials() {
  const testimonials = [
    {
      quote: 'BookAI Pro has revolutionized how I consume knowledge. I can now grasp key concepts from business books in minutes rather than hours.',
      author: 'Michael Johnson',
      role: 'CEO, Tech Innovations',
      initials: 'MJ',
    },
    {
      quote: 'As a PhD student, BookAI Pro saves me countless hours. The summaries are incredibly accurate and capture the essence of complex texts.',
      author: 'Sarah Rodriguez',
      role: 'Research Scientist',
      initials: 'SR',
    },
    {
      quote: 'The personalized insights have transformed my reading habits. I&apos;m absorbing more knowledge in less time than ever before.',
      author: 'David Kim',
      role: 'Product Manager',
      initials: 'DK',
    },
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-[radial-gradient(circle_at_10%_90%,rgba(17,75,150,0.25),transparent_20%),radial-gradient(circle_at_70%_70%,rgba(102,60,175,0.18),transparent_80%),linear-gradient(135deg,#151b27,#07142c_90%,#0b1120)]">
      <div className="container mx-auto px-4 sm:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-[2.8rem] font-bold font-heading mb-8 relative pb-2">
            Trusted by Knowledge Seekers
            <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-accent rounded"></span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of professionals, students, and lifelong learners who have transformed their reading habits.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="cursor-pointer bg-card shadow-2xl border border-[rgba(148,163,184,0.1)] rounded-2xl p-6 hover:shadow-4xl hover:-translate-y-2 transition-all duration-300"
            >
              <p className="text-lg italic text-muted-foreground mb-6 relative">
                <span className="absolute -top-4 -left-4 text-3xl text-primary/20 font-serif text-purple-500">&quot;</span>
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="text-lg font-bold font-heading">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}