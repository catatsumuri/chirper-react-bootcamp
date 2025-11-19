import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { update } from '@/routes/chirps';
import { type Chirp as ChirpType, type SharedData } from '@/types';
import { Form, usePage } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import { Edit, MessageSquare, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

interface ChirpProps {
    chirp: ChirpType;
}

export function Chirp({ chirp }: ChirpProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState(chirp.message);
    const { auth } = usePage<SharedData>().props;
    const isAuthor = auth.user.id === chirp.user.id;
    const isEdited = chirp.created_at !== chirp.updated_at;

    return (
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-neutral-800">
            <div className="flex items-start gap-3">
                <MessageSquare className="mt-1 h-5 w-5" />
                <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">
                                {chirp.user.name}
                            </span>
                            <span className="text-sm text-neutral-500">
                                {formatDistanceToNow(
                                    new Date(chirp.created_at),
                                    {
                                        addSuffix: true,
                                    },
                                )}
                            </span>
                            {isEdited && (
                                <span className="text-sm text-neutral-500">
                                    · edited
                                </span>
                            )}
                        </div>
                        {!isEditing && isAuthor && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                    >
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>

                    {isEditing ? (
                        <div className="mt-2 space-y-2">
                            <Form
                                action={update(chirp)}
                                className="mt-2 space-y-2"
                                onSuccess={() => setIsEditing(false)}
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <Textarea
                                            value={message}
                                            name="message"
                                            onChange={(e) =>
                                                setMessage(e.target.value)
                                            }
                                            className="w-full"
                                        />
                                        <div className="flex gap-2">
                                            <Button
                                                type="submit"
                                                size="sm"
                                                disabled={processing}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    setMessage(chirp.message);
                                                    setIsEditing(false);
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </div>
                    ) : (
                        <p className="mt-2 text-neutral-700 dark:text-neutral-300">
                            {chirp.message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
