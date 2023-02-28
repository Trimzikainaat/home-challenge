import React from 'react';
import Filters from '@/components/article/Filters';
import Archive from '@/components/article/Archive';

function Home() {

    return (
        <div className="mt-3">
            <div className="px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-32">
                    <div className="md:col-span-1">
                        <Filters />
                    </div>
                    <div className="md:col-span-3">
                        <Archive />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Home;