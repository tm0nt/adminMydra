"use client"

import type React from "react"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff, Shield, AlertCircle } from "lucide-react"

interface FormErrors {
  email?: string
  password?: string
}

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [shake, setShake] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.email) {
      newErrors.email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória"
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    setIsLoading(true)
    setErrors({})

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsSuccess(true)

      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1500)
    } catch (error) {
      setErrors({ email: "Credenciais inválidas" })
      setShake(true)
      setTimeout(() => setShake(false), 500)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen login-bg flex items-center justify-center p-4 relative overflow-hidden">
        {/* Subtle floating shapes */}
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>

        <div className="login-card rounded-2xl p-8 w-full max-w-md fade-in">
          <div className="text-center">
            <svg className="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="success-checkmark__circle" cx="26" cy="26" r="25" fill="none" />
              <path className="success-checkmark__check" fill="none" d="m14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Login realizado com sucesso!</h2>
            <p className="text-gray-600">Redirecionando para o dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen login-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle floating shapes */}
      <div className="floating-shape"></div>
      <div className="floating-shape"></div>
      <div className="floating-shape"></div>
      <div className="floating-shape"></div>

      <div className={`login-card rounded-2xl p-8 w-full max-w-md fade-in ${shake ? "shake" : ""}`}>
        {/* Logo Section */}
        <div className="text-center mb-8 slide-in">
          <div className="logo-container inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo de volta</h1>
          <p className="text-gray-600">Entre na sua conta ApexPayments</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="input-group">
            <input
              type="email"
              className={`input-field ${errors.email ? "input-error" : ""}`}
              placeholder=" "
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={isLoading}
            />
            <label className="input-label">Email</label>
            <Mail className="input-icon w-5 h-5" />
            {errors.email && (
              <div className="flex items-center mt-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </div>
            )}
          </div>

          {/* Password Input */}
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className={`input-field ${errors.password ? "input-error" : ""}`}
              placeholder=" "
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              disabled={isLoading}
            />
            <label className="input-label">Senha</label>
            <Lock className="input-icon w-5 h-5" />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {errors.password && (
              <div className="flex items-center mt-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.password}
              </div>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                disabled={isLoading}
                className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                Lembrar de mim
              </label>
            </div>
            <Link href="#" className="text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium">
              Esqueceu a senha?
            </Link>
          </div>

          {/* Submit Button */}
          <button type="submit" className={`login-button ${isLoading ? "loading" : ""}`} disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="spinner"></div>
                Entrando...
              </div>
            ) : (
              "Entrar na conta"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Não tem uma conta?{" "}
            <Link href="#" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
              Criar conta gratuita
            </Link>
          </p>
        </div>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center space-x-2 text-gray-500 text-xs">
          <Shield className="w-4 h-4" />
          <span>Protegido por criptografia de ponta a ponta</span>
        </div>
      </div>
    </div>
  )
}
