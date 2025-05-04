import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPageRTK } from '../../state/foods/foodsSlice';

export const Pagination = () => {
    const dispatch = useDispatch();
    const currentPageRTK = useSelector(state => state.pageAndFood.currentPage);
    const totalPages = useSelector(state => state.pageAndFood.totalPages)


    const pagesArray = useMemo(() => {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }, [totalPages]);

    const pageItems = useMemo(() => {
        const items = [];

        if (pagesArray.length <= 5) {
            pagesArray.forEach((number) => {
                items.push(
                    <li
                        key={number}
                        onClick={() => dispatch(setCurrentPageRTK(number))}
                        className={currentPageRTK === number ? 'active bg-lime-300 rounded px-2 cursor-default' : 'rounded px-2 cursor-pointer'}
                    >
                        {number}
                    </li>
                );
            });
        } else {
            if (currentPageRTK > 5) {
                items.push(<li key="start-ellipsis">...</li>);
            }

            const startPage = Math.max(1, currentPageRTK - 4);
            const endPage = Math.min(totalPages, currentPageRTK + 4);

            for (let i = startPage; i <= endPage; i++) {
                items.push(
                    <li
                        key={i}
                        onClick={() => dispatch(setCurrentPageRTK(i))}
                        className={currentPageRTK === i ? 'active bg-lime-300 rounded px-2 cursor-default' : 'rounded px-2 cursor-pointer'}
                    >
                        {i}
                    </li>
                );
            }

            if (currentPageRTK < totalPages - 5) {
                items.push(<li key="end-ellipsis">...</li>);
            }
            console.log(items)
        }

        return items;
    }, [currentPageRTK, totalPages, pagesArray]);

    // console.log(currentPageRTK)

    return (
        <footer>
            <nav className="flex justify-center mb-5 border rounded-2xl shadow bg-white p-1">
                <ul className="flex gap-5">
                    <li
                        onClick={() => dispatch(setCurrentPageRTK(1))}
                        className={currentPageRTK === 1 ? 'active text-gray-300 cursor-default' : 'cursor-pointer'}
                    >
                        First
                    </li>
                    {pageItems}
                    <li
                        onClick={() => dispatch(setCurrentPageRTK(totalPages))}
                        className={currentPageRTK === totalPages ? 'active text-gray-300 cursor-default' : 'cursor-pointer'}
                    >
                        Last
                    </li>
                </ul>
            </nav>
        </footer>
    );
};