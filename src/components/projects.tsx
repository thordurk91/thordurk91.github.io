import { Card, CardContent, CardHeader } from "@/components/ui/card"
        import {
          Carousel,
          CarouselContent,
          CarouselItem,
          CarouselNext,
          CarouselPrevious,
        } from "@/components/ui/carousel"

const _projects = [
    {Title: "PokéKort", Summary: "Pokemon Go visual map w/ Leaflet with custom twitter integration and in browser notifications. Sadly no longer active."},
    {Title: "Crypto misc.", Summary: "Various sites with wallet integration, custom databases and interactions with AI over the Solana blockchain."},
    {Title: "Eve Online Excel Addin", Summary: "Lead developer on the official Eve Online addin for Excel, written in TypeScript. Since 2023"},
    {Title: "Verbal Carnage", Summary: "Asteroids x Typing of the dead. A group project for a video game centered class."},
    {Title: "Footy Signups", Summary: "Personalized and easy to manage signup sites for weekly group events, via supabase and NextJS."},
    {Title: "Xmas Tracker", Summary: "Family centered xmas shopping list and budget overview. Includes graphs and a christmas tree that gets more packages under it as you wrap in the presents."},
]
export const Projects = () => {
    return (
        <>
            <h2 className="text-white font-semibold text-center w-full rounded border-gray-100 border-2 p-2 mt-6">Fun Projects</h2>
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {_projects.map((item, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card className="select-none bg-black/50 text-white backdrop-blur-md">
                        <CardHeader>
                        <p className="text-4xl font-semibold mr-2 " >{item.Title}</p></CardHeader>
                        <CardContent className="flex p-6">
                          <p>{item.Summary}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            </>
    )
}