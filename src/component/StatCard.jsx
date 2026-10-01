import PropTypes from 'prop-types';

export default function StatCard({ icon, label, value, loading, accent, onClick }) {
    return (
        <button
            onClick={onClick}
            className="bg-white rounded-2xl shadow-md p-5 flex items-center space-x-4 text-left hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:cursor-default"
            disabled={!onClick}
        >
            <div className={`flex items-center justify-center w-14 h-14 rounded-xl text-2xl text-white ${accent}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <p className="text-2xl font-bold text-gray-800">
                    {loading ? <span className="inline-block w-10 h-6 bg-gray-200 rounded animate-pulse" /> : value}
                </p>
            </div>
        </button>
    );
}

StatCard.propTypes = {
    icon: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    loading: PropTypes.bool,
    accent: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};
