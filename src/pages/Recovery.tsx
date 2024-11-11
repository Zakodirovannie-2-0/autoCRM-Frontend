import Modal from "../components/Modal.tsx";
import React, {ChangeEvent, FormEventHandler, useState} from "react";


interface FormData {
    full_name: string;
    email: string;
    password: string;
    re_password: string;

}

const Recovery: React.FC = () => {
    const [data, setData] = useState<FormData>({
        full_name: '',
        email: '',
        password: '',
        re_password: '',
    });

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;
        setData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault();

    }

    const [open, setOpen] = useState<boolean>(false)

    return (
        <div className={'w-full flex flex-col h-dvh mx-auto bg-main-bg bg-cover overflow-auto'}>
            <header className="mt-40">
                <div className="flex flex-col w-full text-[#000000]">
                    <div><h2 className="text-5xl text-center font-semibold drop-shadow-lg">Восстановление пароля</h2></div>
                </div>
            </header>
            <div className={'mt-32 container mx-auto max-w-xm flex flex-col'}>
                <div className={'flex flex-col'}>
                    <div className={'form_container'}>
                        <form className={'form flex flex-col'} onSubmit={handleSubmit} >

                            <div className={'inputLabel flex flex-col mt-12'}>
                                <label htmlFor='email' className={'text-lg font-semibold'}>E-mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete='email'
                                    className={'input mt-2.5 bg-[#FFFFFFCC] rounded-md p-2 drop-shadow-lg'}
                                    required
                                    onChange={handleChange}
                                    value={data.email}
                                />
                            </div>
                            <div className={"form-actions flex flex-row justify-center mt-20 gap-10"}>
                                <a href="#"
                                   className={'text-center text-lg font-semibold py-2 px-16 bg-[#4C2A21] rounded-md text-[#FFFFFF]'}>
                                    Назад
                                </a>
                                <button
                                    className='text-center text-lg font-semibold py-2 px-16 bg-[#4C2A21] rounded-md text-[#FFFFFF]'
                                    onClick={() => setOpen(true)}>
                                    Далее
                                </button>
                                <Modal open={open} onClose={() => setOpen(false)}>
                                    <div className="w-full text-center">
                                        <h1 className="text-xl">На вашу почту было отправлено письмо с инструкциями по восстановлению пароля.</h1>


                                    </div>
                                </Modal>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recovery;