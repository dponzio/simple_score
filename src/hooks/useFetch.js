import React from 'react';
import {useState, useEffect} from "react";

function useFetch(url) {
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(url)
        .then(response => response.text())
        .then(data => {
            setData(JSON.parse(data));
            setLoading(false);
        })
    }, [url])

    return [data, loading]
}

export default useFetch;
