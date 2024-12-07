"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy, Instagram, QrCode, Share2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TwitterIcon,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

interface PageProps {
  params: { slug: string[] };
}

export default function Share({ params }: PageProps) {
  const [category, day, month, year, name] = params.slug;
  const siteurl = process.env.NEXT_PUBLIC_SITE_URL;

  const postlink = `${siteurl}/design/${category}/${day}/${month}/${year}/${name}`;

  const title = `Check out this design: ${name}`;

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(postlink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInstagramShare = () => {
    window.open("https://www.instagram.com/", "_blank");
    handleCopy();
  };

  const handleQRCodeCopy = () => {
    const svg = document.querySelector(".qr-code svg");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            navigator.clipboard.write([
              new ClipboardItem({ "image/png": blob }),
            ]);
          }
        });
      };
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  const ShareButton = ({ children }: { children: React.ReactNode }) => (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-secondary/80">
      {children}
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Share2 className="mr-2 h-5 w-5" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share This Design</DialogTitle>
          <DialogDescription>
            Share this design on your favorite platform or copy the link.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="social" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="link">Link</TabsTrigger>
            <TabsTrigger value="qr">QR Code</TabsTrigger>
          </TabsList>
          <TabsContent value="social">
            <div className="grid grid-cols-5 gap-4 py-4">
              <ShareButton>
                <FacebookShareButton url={postlink} title={title}>
                  <FacebookIcon size={24} round />
                </FacebookShareButton>
              </ShareButton>
              <ShareButton>
                <TwitterShareButton url={postlink} title={title}>
                  <TwitterIcon size={24} round />
                </TwitterShareButton>
              </ShareButton>
              <ShareButton>
                <LinkedinShareButton url={postlink} title={title}>
                  <LinkedinIcon size={24} round />
                </LinkedinShareButton>
              </ShareButton>
              <ShareButton>
                <WhatsappShareButton url={postlink} title={title}>
                  <WhatsappIcon size={24} round />
                </WhatsappShareButton>
              </ShareButton>
              <ShareButton>
                <RedditShareButton url={postlink} title={title}>
                  <RedditIcon size={24} round />
                </RedditShareButton>
              </ShareButton>
              <ShareButton>
                <TelegramShareButton url={postlink} title={title}>
                  <TelegramIcon size={24} round />
                </TelegramShareButton>
              </ShareButton>
              <ShareButton>
                <EmailShareButton
                  url={postlink}
                  subject={title}
                  body="I thought you might be interested in this design:"
                >
                  <EmailIcon size={24} round />
                </EmailShareButton>
              </ShareButton>
              <ShareButton>
                <PinterestShareButton
                  url={postlink}
                  media={`${siteurl}/og-image.jpg`}
                  description={title}
                >
                  <PinterestIcon size={24} round />
                </PinterestShareButton>
              </ShareButton>
              <ShareButton>
                <TumblrShareButton url={postlink} title={title}>
                  <TumblrIcon size={24} round />
                </TumblrShareButton>
              </ShareButton>
              <ShareButton>
                <ViberShareButton url={postlink} title={title}>
                  <ViberIcon size={24} round />
                </ViberShareButton>
              </ShareButton>
              <ShareButton>
                <Button
                  variant="ghost"
                  className="h-full w-full rounded-full p-0"
                  onClick={handleInstagramShare}
                >
                  <Instagram size={24} />
                </Button>
              </ShareButton>
            </div>
          </TabsContent>
          <TabsContent value="link">
            <div className="flex flex-col space-y-2 py-4">
              <Textarea
                value={postlink}
                readOnly
                className="min-h-[80px] resize-none"
              />
              <Button onClick={handleCopy} className="w-full">
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" /> Copy Link
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="qr">
            <div className="flex flex-col items-center justify-center py-4">
              <div className="qr-code">
                <QRCodeSVG value={postlink} size={200} />
              </div>
              <Button onClick={handleQRCodeCopy} className="mt-4">
                <QrCode className="mr-2 h-4 w-4" /> Copy QR Code
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}