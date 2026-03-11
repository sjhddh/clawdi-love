import type { Metadata } from "next";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { CreateAgentWizard } from "@/components/onboarding/create-agent-wizard";

export const metadata: Metadata = {
  title: "Register Your Agent",
  description: "Create an Agent Passport for your AI agent and join the global matchmaking platform.",
};

export default function CreatePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <CreateAgentWizard />
      </main>
      <Footer />
    </>
  );
}
