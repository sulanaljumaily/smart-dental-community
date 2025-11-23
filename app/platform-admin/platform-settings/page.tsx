"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Settings,
  ShoppingCart,
  Briefcase,
  Users,
  Database,
  Bot,
  MapPin,
  Key,
  Save,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  DollarSign,
} from "lucide-react"

export default function PlatformSettingsPage() {
  const [showApiKeys, setShowApiKeys] = useState(false)

  // حالة تفعيل الأقسام
  const [platformFeatures, setPlatformFeatures] = useState({
    marketplace: true,
    jobs: true,
    community: true,
  })

  // معلومات المنصة
  const [platformInfo, setPlatformInfo] = useState({
    name: "المجتمع الطبي السني الذكي",
    nameEn: "Smart Dental Community",
    version: "1.0.0",
    email: "info@smartdental.iq",
    phone: "+964 XXX XXX XXXX",
    address: "بغداد، العراق",
  })

  // مفاتيح API
  const [apiKeys, setApiKeys] = useState({
    googleMapsKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX",
    openaiKey: "sk-XXXXXXXXXXXXXXXXXXXXXXXX",
    stripeKey: "pk_XXXXXXXXXXXXXXXXXXXXXXXX",
  })

  // إحصائيات قواعد البيانات
  const databaseStats = {
    totalRecords: 125487,
    totalSize: "2.4 GB",
    clinics: 347,
    dentists: 402,
    vendors: 56,
    products: 2845,
    orders: 1234,
    lastBackup: "2024-01-20 03:00:00",
  }

  // وكلاء الذكاء الاصطناعي
  const aiAgents = [
    {
      id: "1",
      name: "مساعد العيادة الذكي",
      type: "GPT-4",
      status: "active",
      requestsToday: 1247,
      requestsMonth: 38941,
    },
    {
      id: "2",
      name: "محلل الأشعة",
      type: "Vision AI",
      status: "active",
      requestsToday: 342,
      requestsMonth: 9876,
    },
    {
      id: "3",
      name: "مساعد خطط العلاج",
      type: "GPT-4",
      status: "active",
      requestsToday: 876,
      requestsMonth: 24156,
    },
  ]

  const handleFeatureToggle = (feature: string) => {
    setPlatformFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature as keyof typeof prev]
    }))
  }

  const handleSavePlatformInfo = () => {
    // TODO: حفظ معلومات المنصة عبر API
    console.log("Saving platform info:", platformInfo)
  }

  const handleSaveApiKeys = () => {
    // TODO: حفظ مفاتيح API عبر API
    console.log("Saving API keys")
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ar-IQ').format(num)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">إدارة المنصة</h1>
        <p className="text-muted-foreground">إعدادات وتفعيل أقسام المنصة</p>
      </div>

      {/* معلومات المنصة */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-600" />
            معلومات المنصة
          </CardTitle>
          <CardDescription>
            البيانات الأساسية للمنصة
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>اسم المنصة (عربي)</Label>
              <Input
                value={platformInfo.name}
                onChange={(e) => setPlatformInfo({...platformInfo, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>اسم المنصة (English)</Label>
              <Input
                value={platformInfo.nameEn}
                onChange={(e) => setPlatformInfo({...platformInfo, nameEn: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>البريد الإلكتروني</Label>
              <Input
                type="email"
                value={platformInfo.email}
                onChange={(e) => setPlatformInfo({...platformInfo, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>رقم الهاتف</Label>
              <Input
                value={platformInfo.phone}
                onChange={(e) => setPlatformInfo({...platformInfo, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>العنوان</Label>
              <Input
                value={platformInfo.address}
                onChange={(e) => setPlatformInfo({...platformInfo, address: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>إصدار المنصة</Label>
              <Input
                value={platformInfo.version}
                disabled
                className="bg-muted"
              />
            </div>
          </div>
          <Button onClick={handleSavePlatformInfo}>
            <Save className="w-4 h-4 ml-2" />
            حفظ التغييرات
          </Button>
        </CardContent>
      </Card>

      {/* تفعيل وإلغاء تفعيل أقسام المنصة */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            تفعيل أقسام المنصة
          </CardTitle>
          <CardDescription>
            تحكم في تفعيل وإلغاء تفعيل الأقسام الرئيسية
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* المتجر */}
          <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                platformFeatures.marketplace
                  ? 'bg-gradient-to-br from-green-500 to-green-700'
                  : 'bg-gray-200'
              }`}>
                <ShoppingCart className={`w-6 h-6 ${platformFeatures.marketplace ? 'text-white' : 'text-gray-500'}`} />
              </div>
              <div>
                <h3 className="font-bold">المتجر الطبي</h3>
                <p className="text-sm text-muted-foreground">
                  منصة المتجر للموردين والمنتجات الطبية
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={platformFeatures.marketplace ? "success" : "secondary"}>
                {platformFeatures.marketplace ? "مفعّل" : "غير مفعّل"}
              </Badge>
              <Switch
                checked={platformFeatures.marketplace}
                onCheckedChange={() => handleFeatureToggle('marketplace')}
              />
            </div>
          </div>

          {/* الوظائف */}
          <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                platformFeatures.jobs
                  ? 'bg-gradient-to-br from-blue-500 to-blue-700'
                  : 'bg-gray-200'
              }`}>
                <Briefcase className={`w-6 h-6 ${platformFeatures.jobs ? 'text-white' : 'text-gray-500'}`} />
              </div>
              <div>
                <h3 className="font-bold">الوظائف</h3>
                <p className="text-sm text-muted-foreground">
                  منصة الوظائف والتوظيف الطبي
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={platformFeatures.jobs ? "success" : "secondary"}>
                {platformFeatures.jobs ? "مفعّل" : "غير مفعّل"}
              </Badge>
              <Switch
                checked={platformFeatures.jobs}
                onCheckedChange={() => handleFeatureToggle('jobs')}
              />
            </div>
          </div>

          {/* المجتمع */}
          <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                platformFeatures.community
                  ? 'bg-gradient-to-br from-purple-500 to-purple-700'
                  : 'bg-gray-200'
              }`}>
                <Users className={`w-6 h-6 ${platformFeatures.community ? 'text-white' : 'text-gray-500'}`} />
              </div>
              <div>
                <h3 className="font-bold">المجتمع الطبي</h3>
                <p className="text-sm text-muted-foreground">
                  الندوات والدورات والمجتمع التعليمي
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={platformFeatures.community ? "success" : "secondary"}>
                {platformFeatures.community ? "مفعّل" : "غير مفعّل"}
              </Badge>
              <Switch
                checked={platformFeatures.community}
                onCheckedChange={() => handleFeatureToggle('community')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* إحصائيات قواعد البيانات */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-green-600" />
            قواعد البيانات
          </CardTitle>
          <CardDescription>
            إحصائيات وحالة قواعد البيانات
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 mb-4">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm text-muted-foreground mb-1">إجمالي السجلات</p>
              <p className="text-2xl font-bold text-blue-700">{formatNumber(databaseStats.totalRecords)}</p>
            </div>
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <p className="text-sm text-muted-foreground mb-1">حجم البيانات</p>
              <p className="text-2xl font-bold text-green-700">{databaseStats.totalSize}</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <p className="text-sm text-muted-foreground mb-1">العيادات</p>
              <p className="text-2xl font-bold text-purple-700">{formatNumber(databaseStats.clinics)}</p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <p className="text-sm text-muted-foreground mb-1">المنتجات</p>
              <p className="text-2xl font-bold text-orange-700">{formatNumber(databaseStats.products)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium">آخر نسخة احتياطية</p>
              <p className="text-xs text-muted-foreground">{databaseStats.lastBackup}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* وكلاء الذكاء الاصطناعي */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-600" />
            وكلاء الذكاء الاصطناعي
          </CardTitle>
          <CardDescription>
            حالة واستخدام وكلاء AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {aiAgents.map((agent) => (
            <Card key={agent.id} className="bento-card">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold">{agent.name}</h4>
                      <Badge variant="outline">{agent.type}</Badge>
                    </div>
                    <Badge variant={agent.status === 'active' ? 'success' : 'secondary'}>
                      {agent.status === 'active' ? 'نشط' : 'غير نشط'}
                    </Badge>
                  </div>
                  <Bot className="w-8 h-8 text-purple-600" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-xs text-muted-foreground mb-1">طلبات اليوم</p>
                    <p className="text-lg font-bold text-blue-700">{formatNumber(agent.requestsToday)}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                    <p className="text-xs text-muted-foreground mb-1">طلبات الشهر</p>
                    <p className="text-lg font-bold text-purple-700">{formatNumber(agent.requestsMonth)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* إدارة الخرائط ومفاتيح API */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-orange-600" />
            مفاتيح API والخدمات
          </CardTitle>
          <CardDescription>
            إدارة مفاتيح الوصول للخدمات الخارجية
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-orange-50 border border-orange-200">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <p className="text-sm text-orange-800">
              تأكد من عدم مشاركة هذه المفاتيح مع أي شخص غير مصرح له
            </p>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  مفتاح Google Maps
                </Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowApiKeys(!showApiKeys)}
                >
                  {showApiKeys ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <Input
                type={showApiKeys ? "text" : "password"}
                value={apiKeys.googleMapsKey}
                onChange={(e) => setApiKeys({...apiKeys, googleMapsKey: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Bot className="w-4 h-4" />
                مفتاح OpenAI
              </Label>
              <Input
                type={showApiKeys ? "text" : "password"}
                value={apiKeys.openaiKey}
                onChange={(e) => setApiKeys({...apiKeys, openaiKey: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                مفتاح Stripe
              </Label>
              <Input
                type={showApiKeys ? "text" : "password"}
                value={apiKeys.stripeKey}
                onChange={(e) => setApiKeys({...apiKeys, stripeKey: e.target.value})}
              />
            </div>
          </div>

          <Button onClick={handleSaveApiKeys}>
            <Save className="w-4 h-4 ml-2" />
            حفظ المفاتيح
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
