
export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">SonicSoal Privacy Policy</h1>
        <p className="text-lg text-muted-foreground">Effective Date: 2025</p>
      </div>

      <div className="prose prose-lg prose-gray dark:prose-invert max-w-none space-y-10">
        {/* Introduction */}
        <p>
          At SonicSoal, your privacy is sacred. We believe in transparency, minimal data collection, and putting control in your hands.
        </p>

        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-semibold">1. What We Collect</h2>
          <p>We collect only the data necessary to personalize your audio experience and improve platform performance. This may include:</p>
          <ul className="list-disc pl-6">
            <li>Your name, email, and birth details (for AstroSync™)</li>
            <li>Session activity and engagement patterns</li>
            <li>Optional feedback or journal entries</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-semibold">2. How We Use It</h2>
          <p>Your data is used to:</p>
          <ul className="list-disc pl-6">
            <li>Deliver tailored audio sessions</li>
            <li>Improve platform accuracy and quality</li>
            <li>Enable future features like $SOAL reward tracking</li>
          </ul>
          <p>We do not sell your data or use it for third-party advertising.</p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-semibold">3. Your Control</h2>
          <ul className="list-disc pl-6">
            <li>You may request to delete your data at any time by contacting us via the Support page.</li>
            <li>You can opt out of non-essential data tracking through your device/browser settings.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-semibold">4. Data Security</h2>
          <p>
            Your data is encrypted and stored securely. Access is restricted to core SonicSoal personnel and partners directly involved in service delivery.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-semibold">5. Children’s Privacy</h2>
          <p>
            SonicSoal is not intended for users under 13 without parental or guardian consent.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-semibold">6. Changes to This Policy</h2>
          <p>
            We may update this policy to reflect evolving features or legal requirements. The effective date will always be posted above.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p>
            Questions? Contact us via the site’s Support or Contact Us form.
          </p>
        </section>

        {/* Cookie Policy */}
        {/* Cookie Policy */}
        <section className="mt-16 space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-1">SonicSoal Cookie Policy</h2>
            <p className="text-base text-muted-foreground">Effective Date: 2025</p>
          </div>

          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              SonicSoal uses cookies to deliver a smooth, secure, and personalized experience. Cookies are small text files
              stored on your device to help remember your preferences and enhance platform functionality.
            </p>

            <div>
              <h3 className="text-2xl font-semibold mb-2">Types of Cookies We Use</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> Necessary for core features like login, session persistence, and language preference.
                </li>
                <li>
                  <strong>Performance Cookies:</strong> Help us analyze usage trends and improve functionality.
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Store your settings to customize your experience across sessions.
                </li>
              </ul>
              <p className="mt-4">
                We do not use third-party advertising or tracking cookies.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-2">Managing Cookies</h3>
              <p>
                You can disable or manage cookies anytime in your browser settings. Please note that some features of the
                platform may not function correctly if cookies are disabled.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
