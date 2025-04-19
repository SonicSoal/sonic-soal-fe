
export default function TermsOfServicePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">Terms of Service</h1>
        <p className="text-lg text-muted-foreground">Effective Date: 2025</p>
      </div>

      <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
        <p>
          Welcome to SonicSoal. These Terms of Service ("Terms") govern your use of the SonicSoal website, mobile
          experience, and any content, features, or services we provide (collectively, the "Services").
        </p>
        <p>
          By accessing or using SonicSoal, you agree to be bound by these Terms. If you do not agree, please do not
          use the Services.
        </p>

        <div className="mt-12 space-y-10">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold">1. Use of Services</h2>
            <p>
              SonicSoal is designed to support personal development, self-regulation, and contemplative experiences
              through immersive audio sessions. You agree to use the Services only for lawful and non-commercial
              purposes, unless explicitly authorized.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold">2. User Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6">
              <li>
                Use SonicSoal while driving, operating heavy machinery, or during any activity requiring full
                attention.
              </li>
              <li>
                Use the Services in any manner that may harm others or interfere with the experience of other users.
              </li>
              <li>Attempt to reverse-engineer or misuse our proprietary audio or platform.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold">3. Health & Safety Disclaimer</h2>
            <p>
              SonicSoal sessions are not medical treatments. Consult a licensed professional for any mental or
              physical health concerns. Stay hydrated and practice safe listening conditions—avoid use in vehicles
              or while in water.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold">4. Intellectual Property</h2>
            <p>
              All audio content, designs, software, and materials provided by SonicSoal are the intellectual
              property of SonicSoal and may not be copied, altered, or redistributed without permission.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold">5. $SOAL Utility Token</h2>
            <p>
              $SOAL is a non-tradable utility token used to unlock features within the SonicSoal platform. It holds
              no monetary value and cannot be exchanged outside the platform. Future changes to token functionality
              will be disclosed transparently.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold">6. Account & Access</h2>
            <p>
              You may be required to create an account to access certain features. You are responsible for
              maintaining the confidentiality of your credentials and for all activities under your account.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold">7. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to the Services if you violate these Terms or
              engage in any conduct we deem harmful to the platform or community.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-semibold">8. Modifications</h2>
            <p>
              We may revise these Terms periodically. Continued use of the platform after changes signifies your
              acceptance of the updated Terms.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-semibold">9. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of New York,
              without regard to conflict of law principles.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p>
              If you have any questions or concerns regarding these Terms, please reach out through our Contact Form
              on the site.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
