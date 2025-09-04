"use client";
import { useRouter } from "next/navigation";

import css from "./NoteForm.module.css";
import { addNote } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { NewNoteData } from "@/types/note";

interface NoteFormProps {
  tags: string[];
}

export default function NoteForm({ tags }: NoteFormProps) {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: addNote,
    onSuccess: () => {
      router.push("/notes/filter/all");
    },
  });
  // const handleSubmit = (formData: FormData) => {

  //     const values = Object.fromEntries(formData);
  //     console.log(values);
  //     if (!title || values.title.length < 3) {
  //       alert("Title must be at least 3 characters");
  //       return;
  //     }

  //     mutation.mutate(values);
  //   };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData) as unknown as NewNoteData;

    if (!values.title || values.title.length < 3) {
      alert("Title must be at least 3 characters");
      return;
    }

    mutation.mutate(values);
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" required className={css.input} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" required className={css.select}>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          {mutation.isPending ? "Create note ..." : "Create"}
        </button>
      </div>
    </form>
  );
}
