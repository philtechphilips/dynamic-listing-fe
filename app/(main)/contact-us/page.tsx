/**
 * =============================================================================
 * CONTACT US PAGE
 * =============================================================================
 *
 * Contact form page for users to send messages to the support team.
 * Includes form fields for name, email, subject, and message.
 *
 * Features:
 * - Contact form with validation
 * - Contact information display (email, phone, address)
 * - Loading state during submission
 *
 * @route /contact-us
 */

"use client";

import React, { useState } from "react";
import {
  Mail,
  User,
  Tag,
  MessageSquare,
  Send,
  MapPin,
  Phone,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

/**
 * Contact Us Page Component
 * Renders a contact form and company contact information.
 */
export default function ContactUsPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate submission
    setTimeout(() => {
      setIsLoading(false);
      alert("Message sent!");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Get in Touch
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                We'd love to hear from you. Send us a message.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="subject"
                    placeholder="How can we help?"
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Textarea
                    id="message"
                    placeholder="Your message here..."
                    required
                    className="min-h-[120px] pl-10 resize-none"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full gap-2 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center space-y-4 text-sm text-muted-foreground">
          <div className="flex flex-col items-center gap-2">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> support@example.com
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +1 (555) 123-4567
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> 123 Business Avenue, New York, NY
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
