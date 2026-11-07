import { Link } from "react-router-dom";
import type { Club } from "../types/Club";

interface ClubCardProps {
  club: Club;
}

export function ClubCard({ club }: ClubCardProps) {
  return (
    <li>
      <Link to={`/clubs/${club.id}`}>
        <strong>{club.name}</strong> — {club.city}/{club.state}
      </Link>
      <p>
        Fundado em {club.foundedYear} · {club.titles} títulos
      </p>
    </li>
  );
}
