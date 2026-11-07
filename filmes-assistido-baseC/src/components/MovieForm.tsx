import { useState, type FormEvent } from "react";

interface MovieFormProps {
  onCriar: (
    title: string,
    rate: number,
    watchDate: string,
    comment: string,
  ) => void;
}

export function MovieForm({ onCriar }: MovieFormProps) {
  const [title, setTitle] = useState("");
  const [rate, setRate] = useState("");
  const [watchDate, setWatchDate] = useState("");
  const [comment, setComment] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (
      title.trim() === "" ||
      rate.trim() === "" ||
      watchDate.trim() === "" ||
      comment.trim() === ""
    )
      return;

    const rateNumber = Number(rate);

    onCriar(title, rateNumber, watchDate, comment);

    setTitle("");
    setRate("");
    setWatchDate("");
    setComment("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titulo do filme"
      />
      <input
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        placeholder="Nota para o filme"
      />
      <input
        value={watchDate}
        onChange={(e) => setWatchDate(e.target.value)}
        placeholder="Data em que assistiu"
      />
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Comentário sobre o filme"
      />
      <button type="submit">Publicar avaliação</button>
    </form>
  );
}
