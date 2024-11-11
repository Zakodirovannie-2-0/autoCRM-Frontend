import Modal from "../components/Modal.tsx";
import React, {FormEventHandler, useState} from "react";


const ChangePassword: React.FC = () => {

    const handleSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault();
        if (password !== confirmPassword){
            return
        }
        //Типа запрос
        setOpen(true)
    }

    const [password, setPassword] = useState<string>('');

    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [open, setOpen] = useState<boolean>(false)

    return (
        <div className={'w-full flex flex-col h-dvh mx-auto bg-main-bg bg-cover overflow-auto'}>
            <header className="mt-40">
                <div className="flex flex-col w-full text-[#000000]">
                    <div><h2 className="text-5xl text-center font-semibold drop-shadow-lg">Новый пароль</h2></div>
                </div>
            </header>
            <div className={'mt-20 container mx-auto max-w-xm flex flex-col'}>
                <h3 className={'w-full text-center opacity-60 text-[#000000] text-lg'}> Пожалуйста, придумайте новый пароль, который будете знать только Вы.
                    Пароль должен содержать не меньше 8 символов.</h3>
                <div className={'flex flex-col'}>
                    <div className={'form_container'}>
                        <form className={'form flex flex-col'} onSubmit={handleSubmit}>

                            <div className="form-group flex flex-col mt-12">
                                <label htmlFor="password" className={'text-lg font-semibold'}>Пароль</label>
                                <input
                                    type="password"
                                    id="password"
                                    required
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    className={'input mt-2.5 bg-[#FFFFFFCC] rounded-md p-2 drop-shadow-lg'}
                                />
                            </div>
                            <div className="form-group flex flex-col mt-12">
                                <label htmlFor="password" className={'text-lg font-semibold'}>Повторите пароль</label>
                                <input
                                    type="password"
                                    id="password"
                                    required
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                    className={'input mt-2.5 bg-[#FFFFFFCC] rounded-md p-2 drop-shadow-lg'}
                                />
                            </div>
                            <div className={"form-actions flex flex-row justify-center mt-20 gap-10"}>
                                <button
                                    className='text-center text-lg font-semibold py-2 px-16 bg-[#4C2A21] rounded-md text-[#FFFFFF]'
                                    onClick={() => setOpen(true)}>
                                    Сохранить
                                </button>

                                <Modal open={open} onClose={() => setOpen(false)}>
                                    <div className="w-full text-center px-32 py-2">
                                        <h1 className="text-xl">Пароль успешно изменен.</h1>
                                        <button className='mt-16 text-center text-lg font-semibold py-2 px-16 bg-[#4C2A21] rounded-md text-[#FFFFFF]'>Продолжить</button>
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

export default ChangePassword;
