import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type Metadata } from "next";
import { Check } from "lucide-react";
import { FREE, PRO } from "@/consts/tiers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
};

type PricingCardProps = {
  type: "Free" | "Pro" | "Custom";
  price: number | "Custom";
  features: string[];
};

function PricingCard({ price, features, type }: PricingCardProps) {
  let actionLinkHref = "";

  switch (type) {
    case "Free":
      actionLinkHref = "/register";
      break;
    case "Custom":
      actionLinkHref = "mailto:magedibra@yahoo.com";
      break;
  }

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between rounded-lg border p-6 shadow-md",
        type === "Pro" ? "border-primary shadow-2xl" : "border-gray-300",
      )}
    >
      {type === "Pro" && (
        <div className="absolute left-1/2 top-0 inline-block -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-secondary to-primary px-3 py-1 text-sm text-white">
          Popular
        </div>
      )}
      <div>
        <h3 className="text-center text-2xl font-bold">{type}</h3>
        <div className="mt-4 text-center">
          <span className="text-4xl font-bold">
            {price === "Custom" ? (
              "Custom"
            ) : (
              <>
                ${price}
                <span className="text-base text-zinc-600">/mo</span>
              </>
            )}
          </span>
        </div>
        <ul className="mt-4 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="mr-2 text-success" />
              {feature.replaceAll("Infinity", "Unlimited")}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <Button
          className={cn(
            "w-full",
            type === "Pro" && "bg-gradient-to-r from-secondary to-primary",
          )}
          asChild
        >
          <Link href={actionLinkHref}>
            {type === "Custom" ? "Contact Me" : "Get Started"}
          </Link>
        </Button>
      </div>
    </div>
  );
}

function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="container pt-10">
        <div className="flex items-center justify-center">
          <h1 className="w-max bg-gradient-to-r from-secondary to-primary bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
            Pricing
          </h1>
        </div>
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              <PricingCard
                price={FREE.PRICE_IN_CENTS}
                features={[
                  `${FREE.MAXIMUM_NUMBER_OF_PROJECTS} project`,
                  `${FREE.MAXIMUM_NUMBER_OF_TEXT_REVIEWS} text reviews`,
                  `${FREE.MAXIMUM_NUMBER_OF_VIDEO_REVIEWS} video review`,
                ]}
                type="Free"
              />
              {/* TODO: Add Payment Checkout when pressing popular */}
              <PricingCard
                price={PRO.PRICE_IN_CENTS / 100}
                features={[
                  `${PRO.MAXIMUM_NUMBER_OF_PROJECTS} projects`,
                  `${PRO.MAXIMUM_NUMBER_OF_TEXT_REVIEWS} text reviews`,
                  `${PRO.MAXIMUM_NUMBER_OF_VIDEO_REVIEWS} video reviews`,
                ]}
                type="Pro"
              />
              <PricingCard
                price={"Custom"}
                features={[
                  "Custom projects",
                  "Unlimited text reviews",
                  "Custom video reviews",
                ]}
                type="Custom"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default PricingPage;
