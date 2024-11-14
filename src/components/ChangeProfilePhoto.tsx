import React, {useState} from 'react';
import image from '../assets/profileImg.svg';

type User = {
    image_url: string|undefined
}

const ChangeProfilePhoto: React.FC<User> = ({image_url=''}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {

    }

    return (
        <div className={`relative max-w-[31.25rem] max-h-[31.25rem] object-contain ml-[13.75rem] mt-[15rem]`}
        onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}
        >
            <img
                className={`min-h-[31.25rem] min-w-min`}
                src={image_url ? image_url : image}
                alt="Аватарка"
            />
            {isHovered ? <div className={`absolute top-0 left-0 max-w-[31.25rem] max-h-[31.25rem] w-full h-full z-10 max-h bg-black bg-opacity-50 cursor-pointer`}
              onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}
            onClick={handleClick}>
                <p className={`text-white text-center font-golos text-xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>Изменить изображение</p>
            </div> : null}
        </div>
    );
};

export default ChangeProfilePhoto;