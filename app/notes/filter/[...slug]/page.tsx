import { fetchNotes } from "@/lib/api";
import NoteClient from "./Notes.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface Props {
  params: Promise<{ slug?: string[] }>;
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const tagFromUrl = slug?.[0];
  const tag = tagFromUrl === "All" ? undefined : tagFromUrl;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", tag],
    queryFn: () => fetchNotes("", 1, 12, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient tag={tag} />
    </HydrationBoundary>
  );
}
