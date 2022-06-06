import React from 'react';
import { TbMist } from 'react-icons/tb';
import { AiOutlineThunderbolt }  from 'react-icons/ai';
import { IoSunnyOutline, IoSnow, IoCloudyOutline }  from 'react-icons/io5';
import { BsCloudRainHeavy, BsCloudDrizzle }  from 'react-icons/bs';

const WeatherIcon = ({weather}) => {
    if (weather === "Thunderstorm") {
        return (
            <>
                <AiOutlineThunderbolt className="icon" /> {weather}
            </>
        );
    }
    if (weather === "Drizzle") {
        return (
            <>
                <BsCloudDrizzle className="icon" /> {weather}
            </>
        );
    }
    if (weather === "Rain") {
        return (
            <>
                <BsCloudRainHeavy className="icon" /> {weather}
            </>
        );
    }
    if (weather === "Snow") {
        return (
            <>
                <IoSnow className="icon" /> {weather}
            </>
        );
    }
    if (weather === "Clear") {
        return (
            <>
                <IoSunnyOutline className="icon" /> {weather}
            </>
        );
    }
    if (weather === "Atmosphere") {
        return (
            <>
                <TbMist className="icon" /> {weather}
            </>
        );
    }
    if (weather === "Clouds") {
        return (
            <>
                <IoCloudyOutline className="icon" /> {weather}
            </>
        );
    }
    return (
        <>
            <IoCloudyOutline className="icon" /> {weather}
        </>
    );
}

export default WeatherIcon;