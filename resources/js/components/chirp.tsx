import { type Chirp as ChirpType } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare } from 'lucide-react';

interface ChirpProps {
    chirp: ChirpType;
}

export function Chirp({ chirp }: ChirpProps) {
    return (
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-neutral-800">
            <div className="flex items-start gap-3">
                <MessageSquare className="mt-1 h-5 w-5" />
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">{chirp.user.name}</span>
                        <span className="text-sm text-neutral-500">
                            {formatDistanceToNow(new Date(chirp.created_at), {
                                addSuffix: true,
                            })}
                        </span>
                    </div>
                    <p className="mt-2 text-neutral-700 dark:text-neutral-300">
                        {chirp.message}
                    </p>
                </div>
            </div>
        </div>
    );
}
