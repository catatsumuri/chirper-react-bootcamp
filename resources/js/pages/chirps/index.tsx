import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { store } from '@/routes/chirps';
import { Form, Head } from '@inertiajs/react';

export default function ChirpsIndex() {
    return (
        <AppLayout>
            <Head title="Chirps" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-semibold">Chirps</h1>

                <Form action={store()} resetOnSuccess className="space-y-4">
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="What's on your mind?"
                                    className="w-full"
                                />
                                <InputError message={errors.message} />
                            </div>

                            <Button type="submit" disabled={processing}>
                                Chirp
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
