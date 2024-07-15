import React, { useEffect, useState } from "react";
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { Link } from "react-router-dom";
const { Search } = Input;
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1677ff',
        }}
    />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);
const Countries = () => {


    const [data, setData] = useState([]);
    console.log(data);

    const [region, setRegion] = useState('all')

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');

    const getCountries = async () => {
        setLoading(true)
        const res = await fetch(`https://restcountries.com/v3.1/${region}`);
        const countries = await res.json();
        setData(countries);
        setLoading(false)
    }

    const found = data.find(i => i.name.common.toLowerCase().includes(search))

    useEffect(() => {
        getCountries()
    }, [region])


    useEffect(() => {
        getCountries()
    }, [])

    return (
        <section>
            <div className="container py-10 flex justify-between items-center">
                <div className="shadow-search border border-gray-500 space-x-2 py-3 px-5">
                    <Space direction="vertical">
                        <Search placeholder="Search here..." onSearch={onSearch} enterButton />
                    </Space>                
                    </div>

                {
                    data.length > 1 && !found &&
                    <div className="container text-center">
                        <h1>Not found</h1>
                    </div>
                }

                <select onChange={(e) => setRegion(e.target.value)}>
                    <option value="all">All</option>
                    <option value="region/africa">Africa</option>
                    <option value="region/americas">America</option>
                    <option value="region/asia">Asia</option>
                    <option value="region/europe">Europe</option>
                    <option value="region/oceania">Ociania</option>
                </select>
            </div>

            <ul className="container">
                {
                    loading ?
                        <div className='container text-center'>
                            <h1>Loading...</h1>
                        </div>
                        : <ul className='container grid grid-cols-4 gap-[60px]'>
                            {
                                data.map((i, index) => {
                                    return (
                                        <Link key={index} to={`/countries/${i.name.common}`} className={`shadow-cart rounded-md overflow-hidden ${i.name.common.toLowerCase().includes(search) ? 'block' : 'hidden'}`}>
                                            <img className='h-40 w-full' src={i.flags.png} alt="flags image" />
                                            <div className='p-5'>
                                                <h3>{i.name.common}</h3>

                                                <ul className='card-desc space-y-1 mt-2 text-sm'>
                                                    <li>
                                                        <b>Population:</b>
                                                        <span>{i.population}</span>
                                                    </li>
                                                    <li>
                                                        <b>Region:</b>
                                                        <span>{i.region}</span>
                                                    </li>
                                                    <li>
                                                        <b>Capital:</b>
                                                        <span>{i.capital}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </ul>
                }

            </ul>

        </section>
    )
}

export default Countries
