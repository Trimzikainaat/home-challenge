import React, { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles as getArticles } from '@/actions/articleActions';

function Archive() {

    const dispatch = useDispatch();
    const { loading, articles, error, formData, page} = useSelector((state) => state.article);

    function limitDescription(description) {
        const words = description.split(' ');
        if (words.length > 40) {
          return words.slice(0, 40).join(' ') + '...';
        }
        return description;
    }

    function formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        return date.toLocaleString();
    }

    async function loadArticles(data, page, limit = 9) {
        try {
            await dispatch(getArticles({ ...data, limit, page }));
            // Redirect to home page or private page
        } catch (error) {
            const errorMessage = handleError(error);
            // Display error message to the user
        }
    }

    useEffect(() => {
        loadArticles(formData);
    }, [formData]);

    return (
        <div>
            <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3 mb-10">
                {articles && articles.map((article, index) => (
                    <div key={index} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                        {
                            article.image && (
                                <div className="flex-shrink-0">
                                    <img className="h-48 w-full object-cover" src={article.image} alt="" />
                                </div>

                            )
                        }
                        <div className="flex flex-1 flex-col justify-between bg-white p-6">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-indigo-600">
                                    <a href={''} className="hover:underline">
                                        {article.source}
                                    </a>
                                </p>
                                <a href={article.href} className="mt-2 block">
                                    <p className="text-xl font-semibold text-gray-900">{article.title}</p>
                                    <p className="mt-3 text-base text-gray-500">{limitDescription(article.description)}</p>
                                </a>
                            </div>
                            <div className="mt-6 flex items-center">
                                <div className="">
                                    <div className="flex space-x-1 text-sm text-gray-500">
                                        <time dateTime={article.published_at}>{formatDateTime(article.published_at)}</time>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {loading ? (
                <div className="flex self-center">
                    <div className="m-auto">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500"></div>
                    </div>
                </div>
            ) : (articles.length) && (
                <div className="flex justify-center my-8">
                    <button onClick={() => loadArticles(formData, page)} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline">
                        Load More
                    </button>
                </div>
            )}

            {
                error && (
                    <div className="error text-center text-rose-600">{error.message}</div>
                )
            }
        </div>
    );
}

export default Archive;