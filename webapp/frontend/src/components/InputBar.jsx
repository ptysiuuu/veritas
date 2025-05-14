import { useState } from 'react';
import sanitizeHtml from 'sanitize-html';

import Counter from './Counter';

function sanitizeInput(text) {
    let clean = sanitizeHtml(text, {
        allowedTags: [],
        allowedAttributes: {},
    });
    clean = clean.replace(/[\u200B-\u200D\uFEFF]/g, '');
    clean = clean.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])+/g, '');
    return clean;
}

const InputBar = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        if (!input) return;
        const sanitized = sanitizeInput(input);
        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: sanitized }),
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setResponse(data); // spodziewamy się { label, confidence }
        } catch (err) {
            console.error('Error while sending:', err);
            setError('Server error.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl w-full mx-auto rounded-2x lp-6 flex flex-col gap-4 shadow-md mt-25 h-[70vh]">
            <textarea
                rows="6"
                placeholder="Input the article..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-4 border-3 border-white dark:border-white rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-black text-black h-full"
            />

            <button
                onClick={handleSubmit}
                className="self-start bg-black text-white dark:bg-white dark:text-black px-6 py-2 mb-2 rounded-full hover:bg-stone-800 cursor-pointer transition-colors disabled:opacity-50"
                disabled={loading}
            >
                {loading ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 animate-spin">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                    : 'Send to classification'}
            </button>

            {error && (
                <div className="text-red-600 bg-red-100 border border-red-300 p-3 rounded-lg">
                    {error}
                </div>
            )}

            {response && (
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                    <strong className="block mb-2 text-gray-800">Classification results:</strong>
                    <div className="text-gray-700">
                        <p className={`text-center text-2xl font-semibold ${response.label ? 'text-green-600' : 'text-red-600'}`}>
                            <strong>{response.label ? 'Truth' : 'Fake'}</strong>
                        </p>
                        <p><strong>Confidence:</strong></p>
                        <Counter target={response.confidence} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default InputBar;
