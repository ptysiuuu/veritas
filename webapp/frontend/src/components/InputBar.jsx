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
        <div className="bg-white max-w-5xl w-full mx-auto rounded-2xl border-2 border-gray-200 p-6 flex flex-col gap-4 shadow-md mt-20">
            <textarea
                rows="6"
                placeholder="Input the article..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-4 border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
            />

            <button
                onClick={handleSubmit}
                className="self-start bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors disabled:opacity-50"
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Send to classification'}
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
