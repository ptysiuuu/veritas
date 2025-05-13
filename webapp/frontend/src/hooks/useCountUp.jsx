import { useEffect, useState } from 'react';

export function useCountUp(target, duration = 1500, decimals = 2, locale = 'pl-PL') {
    const [value, setValue] = useState('0');

    const clampedTarget = Math.min(Math.max(target, 0), 100);

    useEffect(() => {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = (progress * clampedTarget).toFixed(decimals);

            setValue(
                Number(current).toLocaleString(locale, {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals,
                }) + '%'
            );

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                setValue(
                    clampedTarget.toLocaleString(locale, {
                        minimumFractionDigits: decimals,
                        maximumFractionDigits: decimals,
                    }) + '%'
                );
            }
        }

        requestAnimationFrame(update);
    }, [clampedTarget, duration, decimals, locale]);

    return value;
}
