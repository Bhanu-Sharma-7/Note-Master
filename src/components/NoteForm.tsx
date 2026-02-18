'use client'

import { createNote } from "@/app/actions/noteActions"
import { useActionState } from "react"

const NoteForm = () => {
    const [state, fromAction, isPending] = useActionState(createNote, null)

    return (
        <>
            <div>
                <form action={fromAction}>
                    <input type="text" name='heading' placeholder='enter your heading...' />
                    <textarea name="content" placeholder='enter your content' />
                    <button
                        disabled={isPending}
                    >
                        {isPending ? 'Saving...' : 'Save Note'}
                    </button>

                    {state?.message && (
                        <p className={state.status === 'error' ? 'text-red-500' : 'text-green-500'}>{state.message}</p>
                    )}

                </form>
            </div>
        </>
    )
}

export default NoteForm
