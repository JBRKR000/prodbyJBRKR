export function ContactSection() {
  return (
    <section id="contact" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-lg border border-border bg-surface p-6 text-center backdrop-blur-xl md:p-12 lg:p-16">
        <h2 className="mb-4 font-headings text-4xl font-bold">
          Ready to work?
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
          For exclusive rights, custom production, or general inquiries, reach
          out below. I usually respond within 24 hours.
        </p>

        <form className="mb-10 grid grid-cols-1 gap-6 text-left md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="ml-1 text-sm font-bold text-muted-foreground">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              placeholder="Your name"
              className="rounded-lg border border-border bg-surface px-4 py-3 text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="ml-1 text-sm font-bold text-muted-foreground">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="your@email.com"
              className="rounded-lg border border-border bg-surface px-4 py-3 text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="contact-message" className="ml-1 text-sm font-bold text-muted-foreground">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Tell me about your project..."
              className="min-h-32 resize-y rounded-lg border border-border bg-surface px-4 py-3 text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
        </form>

        <button
          type="button"
          className="w-full rounded-full bg-primary px-12 py-4 text-lg font-bold text-primary-foreground transition-opacity hover:opacity-90 md:w-auto"
        >
          Send Message
        </button>
      </div>
    </section>
  );
}
