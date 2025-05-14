export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 text-lg leading-relaxed text-black dark:text-white">
            <h1 className="text-4xl font-bold mb-6 text-center">About Veritas</h1>

            <p className="mb-4">
                <strong>Veritas</strong> is an intelligent platform designed to help users assess the credibility of written content. Whether it's an article, social media post, or online news, Veritas analyzes the text and provides a classification: <span className="font-semibold dark:text-green-600 text-green-800">truthful</span> or <span className="font-semibold text-red-600 dark:text-red-400">fake</span>.
            </p>

            <p className="mb-4">
                The system utilizes modern <span className="font-semibold">machine learning</span> techniques, including natural language processing (NLP), to detect patterns and linguistic signals typical for misinformation. It learns from large, verified datasets to ensure accurate and trustworthy results.
            </p>

            <p className="mb-4">
                Veritas is built with transparency in mind. We believe that fighting misinformation should be as open and explainable as possible. That’s why every classification includes a confidence score, giving you insight into how certain the system is about its decision.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4">Why Veritas?</h2>
            <ul className="list-disc list-inside mb-6">
                <li><span className="font-medium">Protect yourself</span> from misinformation, fake news, and propaganda.</li>
                <li><span className="font-medium">Quickly verify</span> content when you’re unsure about its credibility.</li>
                <li><span className="font-medium">Stay informed</span> with accurate, data-driven results.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">How does it work?</h2>
            <p className="mb-4">
                Veritas sends the input text to a backend model trained on thousands of labeled articles. It extracts semantic features, performs linguistic analysis, and classifies the input using a fine-tuned machine learning classifier.
            </p>

            <p className="mb-4">
                You can test it yourself by pasting any text into the input bar and clicking <span className="italic">“Send to classification.”</span> The system will return a result along with a confidence percentage.
            </p>

            <div className="mt-10 p-6 rounded-xl bg-gradient-to-br from-[#4F8EF7]/10 to-transparent border dark:border-gray-700 text-center">
                <p className="text-xl italic">“In a time of deceit, telling the truth is a revolutionary act.”</p>
                <p className="mt-2 text-right">– George Orwell</p>
            </div>
        </div>
    );
}
