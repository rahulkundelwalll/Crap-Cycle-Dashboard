import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

export default function DataTable({ columns, data, searchFields, searchPlaceholder, perPage }) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(0);

    const filteredData = searchFields.length
        ? data.filter((row) =>
            searchFields.some((field) =>
                String(row[field] ?? '').toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
        : data;

    const offset = currentPage * perPage;
    const currentRows = filteredData.slice(offset, offset + perPage);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(0);
    };

    return (
        <div className="mx-auto pt-10 container">
            {searchFields.length > 0 && (
                <div className="mb-4 flex justify-center">
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="px-4 py-2 border border-gray-300 rounded-3xl w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            )}
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.no</th>
                        {columns.map((column) => (
                            <th key={column.header} className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {currentRows.map((row, index) => (
                        <tr key={row.id ?? offset + index} className="hover:bg-gray-50">
                            <td className="py-2 px-4">{offset + index + 1}</td>
                            {columns.map((column) => (
                                <td key={column.header} className="py-2 px-4">
                                    {column.render(row)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.ceil(filteredData.length / perPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    forcePage={currentPage}
                    onPageChange={(selected) => setCurrentPage(selected.selected)}
                    containerClassName={'flex space-x-2'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link bg-white text-gray-800 px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100'}
                    previousLinkClassName={'page-link bg-white text-gray-800 px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100'}
                    nextLinkClassName={'page-link bg-white text-gray-800 px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100'}
                    activeLinkClassName={'bg-gray-200 font-bold'}
                />
            </div>
        </div>
    );
}

DataTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        header: PropTypes.string.isRequired,
        render: PropTypes.func.isRequired,
    })).isRequired,
    data: PropTypes.array.isRequired,
    searchFields: PropTypes.arrayOf(PropTypes.string),
    searchPlaceholder: PropTypes.string,
    perPage: PropTypes.number,
};

DataTable.defaultProps = {
    searchFields: [],
    searchPlaceholder: 'Search...',
    perPage: 10,
};
