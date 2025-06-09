import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Connexion Administrateur" />
            
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#9674C3]/10 to-[#D3D141]/10 p-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Header avec logo */}
                    <div className="bg-[#9674C3] p-6 text-center">
                        <div className="flex justify-center mb-4">
                            <img 
                                src="/images/godem.png" 
                                alt="GODEM Logo" 
                                className="h-20 w-auto"
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Espace Administrateur</h1>
                        <p className="text-white/80 mt-1">Connectez-vous à votre compte</p>
                    </div>

                    {/* Corps du formulaire */}
                    <div className="p-8">
                        {status && (
                            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div className="mb-6">
                                <InputLabel 
                                    htmlFor="email" 
                                    value="Email Administrateur" 
                                    className="block text-sm font-medium text-[#9674C3] mb-1"
                                />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full rounded-lg border-[#9674C3]/50 focus:border-[#9674C3] focus:ring focus:ring-[#9674C3]/20 p-2"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />

                                <InputError message={errors.email} className="mt-1 text-sm" />
                            </div>

                            <div className="mb-6">
                                <InputLabel 
                                    htmlFor="password" 
                                    value="Mot de passe" 
                                    className="block text-sm font-medium text-[#9674C3] mb-1"
                                />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full rounded-lg border-[#9674C3]/50 focus:border-[#9674C3] focus:ring focus:ring-[#9674C3]/20 p-2"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />

                                <InputError message={errors.password} className="mt-1 text-sm" />
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="rounded border-[#9674C3] text-[#9674C3] focus:ring-[#D3D141]"
                                    />
                                    <span className="ms-2 text-sm text-[#9674C3]">
                                        Se souvenir de moi
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-[#9674C3] hover:text-[#D3D141] transition duration-200"
                                    >
                                        Mot de passe oublié ?
                                    </Link>
                                )}
                            </div>

                            <div className="flex justify-center">
                                <PrimaryButton 
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#9674C3] hover:bg-[#7a5b9d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D3D141] transition duration-200"
                                    disabled={processing}
                                >
                                    Se connecter
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}