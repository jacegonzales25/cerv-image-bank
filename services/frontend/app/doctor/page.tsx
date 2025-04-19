"use client"

import { useState } from "react"
import {
  Upload,
  FolderOpen,
  Clock,
  Trash2,
  Search,
  Bell,
  ChevronDown,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  Check,
  X,
  Edit,
  Eye,
} from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ImageIcon } from "lucide-react"
import Image from "next/image"

export default function DoctorInterface() {
  const [activeTab, setActiveTab] = useState("my-uploads")

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r bg-muted/40 p-4 md:flex">
        <div className="flex items-center gap-2 px-2 py-4">
          <div className="rounded-full bg-primary/10 p-1">
            <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              C
            </div>
          </div>
          <h1 className="text-xl font-bold">Cerv.AI</h1>
        </div>
        <nav className="mt-8 flex flex-col gap-2">
          <Button
            variant={activeTab === "my-uploads" ? "secondary" : "ghost"}
            className="justify-start gap-2"
            onClick={() => setActiveTab("my-uploads")}
          >
            <Upload className="h-4 w-4" />
            My Uploads
          </Button>
          <Button
            variant={activeTab === "all-images" ? "secondary" : "ghost"}
            className="justify-start gap-2"
            onClick={() => setActiveTab("all-images")}
          >
            <FolderOpen className="h-4 w-4" />
            All Images
          </Button>
          <Button
            variant={activeTab === "recent" ? "secondary" : "ghost"}
            className="justify-start gap-2"
            onClick={() => setActiveTab("recent")}
          >
            <Clock className="h-4 w-4" />
            Recent
          </Button>
          <Button
            variant={activeTab === "deleted" ? "secondary" : "ghost"}
            className="justify-start gap-2"
            onClick={() => setActiveTab("deleted")}
          >
            <Trash2 className="h-4 w-4" />
            Recently Deleted
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center gap-4">
            <h2 className="text-lg font-semibold">Doctor Dashboard</h2>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Dr. Smith" />
                    <AvatarFallback>DS</AvatarFallback>
                  </Avatar>
                  <span>Dr. Smith</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="my-uploads" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="my-uploads">My Uploads</TabsTrigger>
                <TabsTrigger value="all-images">All Images</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="deleted">Recently Deleted</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Input placeholder="Search images..." className="w-[250px]" />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Upload New Image</DialogTitle>
                      <DialogDescription>Upload a new cervical image with diagnosis information.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="image">Image</Label>
                        <div className="flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed border-input bg-muted/50">
                          <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
                            <ImageIcon className="h-8 w-8" />
                            <span>Drag & drop or click to upload</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="patient-id">Patient ID</Label>
                        <Input id="patient-id" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="diagnosis">Diagnosis</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select diagnosis" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="abnormal">Abnormal</SelectItem>
                            <SelectItem value="positive">Positive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea id="notes" placeholder="Add any additional notes..." />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Upload</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* My Uploads Tab */}
            <TabsContent value="my-uploads" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">My Uploads</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {/* Image Card 1 */}
                <Card>
                  <CardContent className="p-0">
                    <div className="aspect-square bg-muted relative overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Cervical image"
                        className="h-full w-full object-cover"
                      />
                      <Badge className="absolute right-2 top-2 bg-green-500">Normal</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between p-4">
                    <div>
                      <h4 className="font-medium">Patient #2845</h4>
                      <p className="text-xs text-muted-foreground">Uploaded: Jun 15, 2023</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Metadata
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>

                {/* Image Card 2 */}
                <Card>
                  <CardContent className="p-0">
                    <div className="aspect-square bg-muted relative overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Cervical image"
                        className="h-full w-full object-cover"
                      />
                      <Badge className="absolute right-2 top-2 bg-yellow-500 text-yellow-950">Abnormal</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between p-4">
                    <div>
                      <h4 className="font-medium">Patient #2846</h4>
                      <p className="text-xs text-muted-foreground">Uploaded: Jun 14, 2023</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Metadata
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>

                {/* Image Card 3 */}
                <Card>
                  <CardContent className="p-0">
                    <div className="aspect-square bg-muted relative overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Cervical image"
                        className="h-full w-full object-cover"
                      />
                      <Badge className="absolute right-2 top-2 bg-red-500">Positive</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between p-4">
                    <div>
                      <h4 className="font-medium">Patient #2847</h4>
                      <p className="text-xs text-muted-foreground">Uploaded: Jun 13, 2023</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Metadata
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>

                {/* Upload New Card */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer border-dashed">
                      <CardContent className="flex aspect-square flex-col items-center justify-center gap-2 p-6">
                        <div className="rounded-full bg-primary/10 p-3">
                          <Plus className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-center font-medium">Upload New Image</p>
                        <p className="text-center text-sm text-muted-foreground">
                          Click to upload a new cervical image
                        </p>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Upload New Image</DialogTitle>
                      <DialogDescription>Upload a new cervical image with diagnosis information.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="image">Image</Label>
                        <div className="flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed border-input bg-muted/50">
                          <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
                            <ImageIcon className="h-8 w-8" />
                            <span>Drag & drop or click to upload</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="patient-id">Patient ID</Label>
                        <Input id="patient-id" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="diagnosis">Diagnosis</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select diagnosis" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="abnormal">Abnormal</SelectItem>
                            <SelectItem value="positive">Positive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea id="notes" placeholder="Add any additional notes..." />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Upload</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </TabsContent>

            {/* Recently Deleted Tab */}
            <TabsContent value="deleted" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Recently Deleted</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {/* Deleted Image Card */}
                <Card className="opacity-75">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-muted relative overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Cervical image"
                        className="h-full w-full object-cover"
                      />
                      <Badge className="absolute right-2 top-2 bg-green-500">Normal</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between p-4">
                    <div>
                      <h4 className="font-medium">Patient #2840</h4>
                      <p className="text-xs text-muted-foreground">Deleted: Jun 10, 2023</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Restore</span>
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Delete Permanently</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
