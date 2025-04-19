"use client"

import { useState } from "react"
import {
  Download,
  FolderOpen,
  Database,
  Search,
  Bell,
  ChevronDown,
  Filter,
  BarChart3,
  Eye,
  FileDown,
  ArrowDownToLine,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

export default function CervAITeamInterface() {
  const [activeTab, setActiveTab] = useState("datasets")
  const [selectedImages, setSelectedImages] = useState<string[]>([])

  const toggleImageSelection = (id: string) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((imageId) => imageId !== id))
    } else {
      setSelectedImages([...selectedImages, id])
    }
  }

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
          <h1 className="text-xl font-bold">Cerv.AI Team</h1>
        </div>
        <nav className="mt-8 flex flex-col gap-2">
          <Button
            variant={activeTab === "datasets" ? "secondary" : "ghost"}
            className="justify-start gap-2"
            onClick={() => setActiveTab("datasets")}
          >
            <Database className="h-4 w-4" />
            Datasets
          </Button>
          <Button
            variant={activeTab === "downloads" ? "secondary" : "ghost"}
            className="justify-start gap-2"
            onClick={() => setActiveTab("downloads")}
          >
            <Download className="h-4 w-4" />
            Downloads
          </Button>
          <Button
            variant={activeTab === "analytics" ? "secondary" : "ghost"}
            className="justify-start gap-2"
            onClick={() => setActiveTab("analytics")}
          >
            <BarChart3 className="h-4 w-4" />
            Analytics
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center gap-4">
            <h2 className="text-lg font-semibold">AI Team Dashboard</h2>
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
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Team" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <span>Alex Chen</span>
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
          <Tabs defaultValue="datasets" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="datasets">Datasets</TabsTrigger>
              <TabsTrigger value="downloads">Downloads</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Datasets Tab */}
            <TabsContent value="datasets" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Input placeholder="Search datasets..." className="w-[250px]" />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by diagnosis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Diagnoses</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="abnormal">Abnormal</SelectItem>
                      <SelectItem value="positive">Positive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    More Filters
                  </Button>
                  <Button className="gap-2" disabled={selectedImages.length === 0}>
                    <ArrowDownToLine className="h-4 w-4" />
                    Download Selected ({selectedImages.length})
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Cervical Image Dataset</CardTitle>
                  <CardDescription>Browse and download images for AI training</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedImages.length > 0}
                            onCheckedChange={() => {
                              if (selectedImages.length > 0) {
                                setSelectedImages([])
                              } else {
                                setSelectedImages(["img1", "img2", "img3", "img4", "img5"])
                              }
                            }}
                          />
                        </TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Diagnosis</TableHead>
                        <TableHead>Uploader</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                            checked={selectedImages.includes("img1")}
                            onCheckedChange={() => toggleImageSelection("img1")}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="h-12 w-12 rounded bg-muted overflow-hidden">
                            <Image
                              src="/placeholder.svg?height=48&width=48"
                              alt="Cervical image thumbnail"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">IMG_20230615_001</TableCell>
                        <TableCell>
                          <Badge variant="outline">Normal</Badge>
                        </TableCell>
                        <TableCell>Dr. Sarah Smith</TableCell>
                        <TableCell>Jun 15, 2023</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <FileDown className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                            checked={selectedImages.includes("img2")}
                            onCheckedChange={() => toggleImageSelection("img2")}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="h-12 w-12 rounded bg-muted overflow-hidden">
                            <Image
                              src="/placeholder.svg?height=48&width=48"
                              alt="Cervical image thumbnail"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">IMG_20230614_042</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            Abnormal
                          </Badge>
                        </TableCell>
                        <TableCell>Dr. Michael Johnson</TableCell>
                        <TableCell>Jun 14, 2023</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <FileDown className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                            checked={selectedImages.includes("img3")}
                            onCheckedChange={() => toggleImageSelection("img3")}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="h-12 w-12 rounded bg-muted overflow-hidden">
                            <Image
                              src="/placeholder.svg?height=48&width=48"
                              alt="Cervical image thumbnail"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">IMG_20230613_018</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                            Positive
                          </Badge>
                        </TableCell>
                        <TableCell>Dr. Sarah Smith</TableCell>
                        <TableCell>Jun 13, 2023</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <FileDown className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                            checked={selectedImages.includes("img4")}
                            onCheckedChange={() => toggleImageSelection("img4")}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="h-12 w-12 rounded bg-muted overflow-hidden">
                            <Image
                              src="/placeholder.svg?height=48&width=48"
                              alt="Cervical image thumbnail"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">IMG_20230612_056</TableCell>
                        <TableCell>
                          <Badge variant="outline">Normal</Badge>
                        </TableCell>
                        <TableCell>Dr. Michael Johnson</TableCell>
                        <TableCell>Jun 12, 2023</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <FileDown className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                            checked={selectedImages.includes("img5")}
                            onCheckedChange={() => toggleImageSelection("img5")}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="h-12 w-12 rounded bg-muted overflow-hidden">
                            <Image
                              src="/placeholder.svg?height=48&width=48"
                              alt="Cervical image thumbnail"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">IMG_20230611_033</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                            Positive
                          </Badge>
                        </TableCell>
                        <TableCell>Dr. Sarah Smith</TableCell>
                        <TableCell>Jun 11, 2023</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <FileDown className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Showing 5 of 2,856 images</div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Downloads Tab */}
            <TabsContent value="downloads" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Total Downloads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,248</div>
                    <p className="text-sm text-muted-foreground">Images downloaded this month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Download Quota</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">1,248 / 5,000</span>
                        <span className="text-sm text-muted-foreground">24.9%</span>
                      </div>
                      <Progress value={24.9} />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Normal Images</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">624</div>
                    <p className="text-sm text-muted-foreground">50% of downloads</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Abnormal/Positive</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">624</div>
                    <p className="text-sm text-muted-foreground">50% of downloads</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Downloads</CardTitle>
                  <CardDescription>Your team`&apos;`s recent download activity</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Dataset</TableHead>
                        <TableHead>Files</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Downloaded By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FolderOpen className="h-4 w-4 text-muted-foreground" />
                            <span>Normal Samples Batch #12</span>
                          </div>
                        </TableCell>
                        <TableCell>50 images</TableCell>
                        <TableCell>215 MB</TableCell>
                        <TableCell>Alex Chen</TableCell>
                        <TableCell>Today, 10:42 AM</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Download className="h-4 w-4" />
                            Download Again
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FolderOpen className="h-4 w-4 text-muted-foreground" />
                            <span>Positive Samples Batch #8</span>
                          </div>
                        </TableCell>
                        <TableCell>25 images</TableCell>
                        <TableCell>108 MB</TableCell>
                        <TableCell>Maya Rodriguez</TableCell>
                        <TableCell>Yesterday, 3:15 PM</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Download className="h-4 w-4" />
                            Download Again
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FolderOpen className="h-4 w-4 text-muted-foreground" />
                            <span>Abnormal Samples Batch #10</span>
                          </div>
                        </TableCell>
                        <TableCell>35 images</TableCell>
                        <TableCell>152 MB</TableCell>
                        <TableCell>David Kim</TableCell>
                        <TableCell>Jun 15, 2023</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Download className="h-4 w-4" />
                            Download Again
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Dataset Distribution</CardTitle>
                    <CardDescription>Distribution of images by diagnosis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] bg-muted/50 rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Distribution Chart Placeholder</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Download Trends</CardTitle>
                    <CardDescription>Team download activity over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] bg-muted/50 rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Trend Chart Placeholder</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Data Quality Metrics</CardTitle>
                  <CardDescription>Quality assessment of the dataset</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Image Resolution</span>
                        <span className="text-sm text-muted-foreground">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                      <p className="text-xs text-muted-foreground">92% of images meet resolution requirements</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Metadata Completeness</span>
                        <span className="text-sm text-muted-foreground">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                      <p className="text-xs text-muted-foreground">87% of images have complete metadata</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Class Balance</span>
                        <span className="text-sm text-muted-foreground">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                      <p className="text-xs text-muted-foreground">78% balance score across diagnostic classes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
