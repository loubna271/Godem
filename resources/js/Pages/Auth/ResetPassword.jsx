import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.update'));
    };

    return (
        <GuestLayout>
            <Head title="Réinitialiser le mot de passe" />

            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#9674C3]/10 to-[#D3D141]/10 p-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-[#9674C3] p-6 text-center">
                        <div className="flex justify-center mb-4">
                            <img 
                                src="/images/godem.png" 
                                alt="GODEM Logo" 
                                className="h-20 w-auto"
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Réinitialiser le mot de passe</h1>
                    </div>

                    <div className="p-8">
                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-[#9674C3] mb-1">
                                    Email
                                </label>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full rounded-lg border-[#9674C3]/50 focus:border-[#9674C3] focus:ring focus:ring-[#9674C3]/20 p-2"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-1 text-sm" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-[#9674C3] mb-1">
                                    Nouveau mot de passe
                                </label>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full rounded-lg border-[#9674C3]/50 focus:border-[#9674C3] focus:ring focus:ring-[#9674C3]/20 p-2"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-1 text-sm" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-[#9674C3] mb-1">
                                    Confirmer le mot de passe
                                </label>
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full rounded-lg border-[#9674C3]/50 focus:border-[#9674C3] focus:ring focus:ring-[#9674C3]/20 p-2"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                                <InputError message={errors.password_confirmation} className="mt-1 text-sm" />
                            </div>

                            <div className="flex justify-center">
                                <PrimaryButton 
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#9674C3] hover:bg-[#7a5b9d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D3D141] transition duration-200"
                                    disabled={processing}
                                >
                                    Réinitialiser le mot de passe
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}