import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SHADES, getShadeById } from "../../../lib/shades";
import { ProductDetailView } from "../../../components/ProductDetailView";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return SHADES.map((shade) => ({
    id: shade.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const shade = getShadeById(id);

  if (!shade) {
    return {
      title: "Shade Not Found · VERNIS",
    };
  }

  return {
    title: `${shade.number} ${shade.name} · VERNIS Haute Lacquer`,
    description: `${shade.tagline} Origin: ${shade.origin}. 10-Free clean vegan formula with high-gloss mirror finish.`,
    openGraph: {
      title: `${shade.number} ${shade.name} · VERNIS`,
      description: shade.tagline,
      images: [shade.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const shade = getShadeById(id);

  if (!shade) {
    notFound();
  }

  return <ProductDetailView initialShade={shade} />;
}

