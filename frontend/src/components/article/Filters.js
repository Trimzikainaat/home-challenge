import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '@/actions/articleActions';
import { CalendarIcon } from '@heroicons/react/24/solid';
import { getCategories } from '@/fakedb/categories';
import { sources } from '../../fakedb/sources';

function Filters() {

    const dispatch = useDispatch();
    const [showAll, setShowAll] = useState(false);
    const { formData } = useSelector((state) => state.article);
    const uniqueCategories = getCategories();

    // categories number show
    const numToShow = showAll ? uniqueCategories.length : 6;

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleInputChange = (event) => {

        const target = event.target;
        const name = target.name;
        const value = target.value;

        if (target.type === 'checkbox') {
            const checkedValues = formData[name]?.slice() || []
            if (target.checked) {
                checkedValues.push(value);
            } else {
                const index = checkedValues.indexOf(value);
                checkedValues.splice(index, 1);
            }
            dispatch(updateFormData({
                ...formData,
                [name]: checkedValues
            }));
        } else {
            dispatch(updateFormData({
                ...formData,
                [name]: value
            }));
        }
    };


    return (
        <div>
            <h3 className="font-bold text-xl">Filters</h3>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-6">
                    <label htmlFor="keywords" className="text-sm font-medium text-gray-900">
                        Keywords
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="keywords"
                            id="keywords"
                            className="block w-full border border-gray-300 px-4 py-2 rounded shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={formData.values}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="mb-6 relative">
                    <label htmlFor="from" className="text-sm font-medium text-gray-900">
                        Select Date
                    </label>
                    <div className="mt-1 relative border rounded-md shadow-sm">
                        <DatePicker
                            selected={formData.from}
                            onChange={(date) => {
                                handleInputChange({ target: { name: 'from', value: date } });
                            }}
                            name="from"
                            id="from"
                            className="block w-full py-2 px-4 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm"

                        />
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                    </div>
                </div>
                <fieldset className="mb-6">
                    <legend className="text-sm font-medium text-gray-900">Categories</legend>
                    <div className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
                        {uniqueCategories.slice(0, numToShow).map((category, categoryIdx) => (
                            <div key={categoryIdx} className="relative flex items-start py-4">
                                <div className="mr-3 flex h-5 items-center">
                                    <input
                                        id={`category-${category.id}`}
                                        name={'categories'}
                                        type="checkbox"
                                        value={category.id}
                                        checked={formData.categories.includes(category.id)}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                </div>
                                <div className="min-w-0 flex-1 text-sm">
                                    <label htmlFor={`category-${category.id}`} className="select-none font-medium text-gray-700 text-xs">
                                        {category.name}
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                    {uniqueCategories.length > 6 && (
                        <button
                            className="mt-4 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? 'Show Less' : 'Show All'}
                        </button>
                    )}
                </fieldset>
                <fieldset>
                    <legend className="text-sm font-medium text-gray-900">Sources</legend>
                    <div className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
                        {sources.map((source, sourceIdx) => (
                            <div key={sourceIdx} className="relative flex items-start py-4">
                                <div className="mr-3 flex h-5 items-center">
                                    <input
                                        id={`source-${source.id}`}
                                        name={'sources'}
                                        type="checkbox"
                                        value={source.id}
                                        checked={formData.sources.includes(source.id)}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                </div>
                                <div className="min-w-0 flex-1 text-sm">
                                    <label htmlFor={`source-${source.id}`} className="select-none font-medium text-gray-700 text-xs">
                                        {source.name}
                                    </label>
                                </div>

                            </div>
                        ))}
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default Filters;