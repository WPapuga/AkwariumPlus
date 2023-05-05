import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import FishList from '../Components/FishList'
import './Fishes.css'   

export default function Fishes() {
    const [fishList, setFishList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [fishPerPage, setFishPerPage] = useState(3);
    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:3030/getFish')
          .then(response => response.json())
          .then(data => {
            setFishList(data);
            console.log(data);
            setLoading(false);
          });
    }, []);
    const indexOfLastFish = currentPage * fishPerPage;
    const indexOfFirstFish = indexOfLastFish - fishPerPage;
    const currentFish = fishList.slice(indexOfFirstFish, indexOfLastFish);
    const paginate = ({selected}) => {
        setCurrentPage(selected + 1);
    };

    return (
        <div className="App">
            <body className="FishesBody">
                <h1>Katalog Ryb</h1>
                <FishList fish={currentFish} loading={loading}/>
                <ReactPaginate
                    onPageChange={paginate}
                    pageCount={Math.ceil(fishList.length / fishPerPage)}
                    previousLabel={'Poprzednia Strona'}
                    nextLabel={'Następna Strona'}
                    containerClassName={'pagination'}
                    pageLinkClassName={'page-number'}
                    previousLinkClassName={'prev-navigation-button'}
                    nextLinkClassName={'next-navigation-button'}
                    activeLinkClassName={'active'}
                />
            </body>
        </div>
    );
}