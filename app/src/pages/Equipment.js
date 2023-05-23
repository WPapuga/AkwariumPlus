import React, {useEffect, useState} from "react";
import FishList from "../Components/FishList";
import ReactPaginate from "react-paginate";


export default function Equipment() {
    const [filtersList, setFiltersList] = useState([]);
    const [heaterList, setHeatersList] = useState([]);
    const [decorationList, setDecorationList] = useState([]);

    const [loading, setLoading] = useState(false);
    const [fishPerPage, setFishPerPage] = useState(3);
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(1);
    const [page3, setPage3] = useState(1);
    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:3030/getEquipment')
            .then(response => response.json())
            .then(data => {
                setFiltersList(data);
                console.log(data);
                setLoading(false);
            });
    }, []);
    const indexOfLastFilter = page1 * fishPerPage;
    const indexOfFirstFilter = indexOfLastFilter - fishPerPage;
    const currentFilter= filtersList.slice(indexOfFirstFilter, indexOfLastFilter);
    //
    // useEffect(() => {
    //     setLoading(true);
    //     fetch('http://localhost:3030/getHeaters')
    //         .then(response => response.json())
    //         .then(data => {
    //             setHeatersList(data);
    //             console.log(data);
    //         });
    // }, []);
    //
    // const indexOfLastHeater = page2 * fishPerPage;
    // const indexOfFirstHeater = indexOfLastHeater - fishPerPage;
    // const currentHeater= heaterList.slice(indexOfFirstHeater, indexOfLastHeater);
    //
    // useEffect(() => {
    //     setLoading(true);
    //     fetch('http://localhost:3030/getDecorations')
    //         .then(response => response.json())
    //         .then(data => {
    //             setDecorationList(data);
    //             console.log(data);
    //             setLoading(false);
    //         });
    // }, []);
    //
    // const indexOfLastDecoration = page2 * fishPerPage;
    // const indexOfFirstDecoration = indexOfLastDecoration - fishPerPage;
    // const currentDecoration= decorationList.slice(indexOfFirstDecoration, indexOfLastDecoration);

    function handlePageChange1(selectedPage) {
        setPage1(selectedPage.selected+1)
    }

    // function handlePageChange2(selectedPage) {
    //     setPage2(selectedPage.selected+1);
    // }
    // function handlePageChange3(selectedPage) {
    //     setPage3(selectedPage.selected+1);
    // }

    return (
        <div className="App">
            <body className="FishesBody">
            <h1>Wyposazenie</h1>
            <FishList fish={currentFilter} loading={loading}/>
            <ReactPaginate
                onPageChange={handlePageChange1}
                pageCount={Math.ceil(filtersList.length / fishPerPage)}
                previousLabel={'Poprzednia Strona'}
                nextLabel={'Następna Strona'}
                containerClassName={'pagination'}
                pageLinkClassName={'page-number'}
                previousLinkClassName={'prev-navigation-button'}
                nextLinkClassName={'next-navigation-button'}
                activeLinkClassName={'active'}
            />
            {/*<h1>Grzałki</h1>*/}
            {/*<FishList fish={currentHeater} loading={loading}/>*/}
            {/*<ReactPaginate*/}
            {/*    onPageChange={handlePageChange2}*/}
            {/*    pageCount={Math.ceil(heaterList.length / fishPerPage)}*/}
            {/*    previousLabel={'Poprzednia Strona'}*/}
            {/*    nextLabel={'Następna Strona'}*/}
            {/*    containerClassName={'pagination'}*/}
            {/*    pageLinkClassName={'page-number'}*/}
            {/*    previousLinkClassName={'prev-navigation-button'}*/}
            {/*    nextLinkClassName={'next-navigation-button'}*/}
            {/*    activeLinkClassName={'active'}*/}
            {/*/>*/}
            {/*<h1>Dekoracje</h1>*/}
            {/*<FishList fish={currentDecoration} loading={loading}/>*/}
            {/*<ReactPaginate*/}
            {/*    onPageChange={handlePageChange3}*/}
            {/*    pageCount={Math.ceil(decorationList.length / fishPerPage)}*/}
            {/*    previousLabel={'Poprzednia Strona'}*/}
            {/*    nextLabel={'Następna Strona'}*/}
            {/*    containerClassName={'pagination'}*/}
            {/*    pageLinkClassName={'page-number'}*/}
            {/*    previousLinkClassName={'prev-navigation-button'}*/}
            {/*    nextLinkClassName={'next-navigation-button'}*/}
            {/*    activeLinkClassName={'active'}*/}
            {/*/>*/}

            </body>
        </div>
    );
}