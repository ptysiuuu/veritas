import { useCountUp } from '../hooks/useCountUp';

const Counter = ({ target }) => {
    const formattedValue = useCountUp(target, 1500, 2, 'pl-PL');
    return (
        <div className="fade-in counter text-2xl">
            {formattedValue}
        </div>
    );
};

export default Counter;
