import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart,
  FileText,
  FolderOpen,
  PlusCircle,
  Tags,
  Users
} from "lucide-react";
import { RecentDocuments } from "@/components/dashboard/recent-documents";
import Link from "next/link";

export default function DashboardPage() {
  // This would normally be fetched from the server
  const stats = {
    totalDocuments: 128,
    totalFolders: 12,
    totalTags: 24,
    totalUsers: 5,
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold md:text-2xl">Dashboard</h1>
        <Link href="/dashboard/documents/new">
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </Link>
      </div>
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Documents
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDocuments}</div>
            <p className="text-xs text-muted-foreground">
              +6 documents this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Folders
            </CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFolders}</div>
            <p className="text-xs text-muted-foreground">
              +2 folders this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Tags
            </CardTitle>
            <Tags className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTags}</div>
            <p className="text-xs text-muted-foreground">
              +4 tags this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +1 user this month
            </p>
          </CardContent>
        </Card>
      </section>
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>
              Recently uploaded or modified documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentDocuments />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-1">
              <CardTitle>Storage Usage</CardTitle>
              <CardDescription>
                Your storage quota and usage
              </CardDescription>
            </div>
            <div className="ml-auto text-primary">
              <BarChart className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">
                Used 1.24 GB of 5 GB
              </div>
              <div className="text-sm text-muted-foreground">
                25%
              </div>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all" 
                style={{ width: "25%" }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex flex-col gap-1">
                <div className="text-xs text-muted-foreground">
                  Documents
                </div>
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full bg-primary mr-2"
                  />
                  <span className="text-sm font-medium">890 MB</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-xs text-muted-foreground">
                  Images
                </div>
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full bg-chart-2 mr-2"
                  />
                  <span className="text-sm font-medium">350 MB</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-xs text-muted-foreground">
                  Other
                </div>
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full bg-chart-3 mr-2"
                  />
                  <span className="text-sm font-medium">0.8 GB</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-xs text-muted-foreground">
                  Free
                </div>
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full bg-muted mr-2"
                  />
                  <span className="text-sm font-medium">3.76 GB</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}