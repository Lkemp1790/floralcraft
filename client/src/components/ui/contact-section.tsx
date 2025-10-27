'use client'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Please include a brief message'),
})

type FormData = z.infer<typeof schema>

const ContactSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')

  const onSubmit = async (data: FormData) => {
    setStatus('idle')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        throw new Error(json.error || 'Something went wrong')
      }
      setStatus('success')
      reset()
      setTimeout(() => setStatus('idle'), 3000)
    } catch (e: unknown) {
      setStatus('error')
      setErrorMsg(e instanceof Error ? e.message : 'Failed to send message')
      setTimeout(() => setStatus('idle'), 3500)
    }
  }

  const disabled = useMemo(() => isSubmitting || status === 'success', [isSubmitting, status])
  const messagePlaceholder = 'Tell us about your wedding, funeral tribute, or request...'

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#0D383B]">Get in touch</h2>
          <p className="mt-3 text-[#0D383B]/80">We’d love to help craft your florals for any occasion.</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl border border-[#0D383B]/10 p-6 md:p-8 bg-white shadow-sm relative overflow-hidden">
            {/* Success/Failure overlays */}
            {status === 'success' && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-emerald-50/95 animate-fade-in">
                <div className="flex items-center gap-3 text-emerald-700">
                  <span className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center animate-scale-pop">✓</span>
                  <p className="text-emerald-800 font-medium">Thanks! Your message has been sent.</p>
                </div>
              </div>
            )}
            {status === 'error' && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-rose-50/95 animate-fade-in">
                <div className="flex items-center gap-3 text-rose-700">
                  <span className="h-10 w-10 rounded-full bg-rose-600 text-white flex items-center justify-center animate-shake">!</span>
                  <p className="text-rose-800 font-medium">{errorMsg || 'Something went wrong. Please try again.'}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#0D383B] mb-1">Name</label>
                <input
                  type="text"
                  {...register('name')}
                  className={`w-full rounded-lg border px-4 py-2.5 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#5DADAC] ${
                    errors.name ? 'border-rose-300' : 'border-[#0D383B]/20'
                  }`}
                  placeholder="Jane Doe"
                />
                {errors.name && <p className="mt-1 text-sm text-rose-600">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0D383B] mb-1">Email</label>
                <input
                  type="email"
                  {...register('email')}
                  className={`w-full rounded-lg border px-4 py-2.5 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#5DADAC] ${
                    errors.email ? 'border-rose-300' : 'border-[#0D383B]/20'
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-rose-600">{errors.email.message}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[#0D383B] mb-1">Phone (optional)</label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="w-full rounded-lg border px-4 py-2.5 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#5DADAC] border-[#0D383B]/20"
                  placeholder="01234 567890"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[#0D383B] mb-1">Message</label>
                <textarea
                  rows={5}
                  {...register('message')}
                  className={`w-full rounded-lg border px-4 py-2.5 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#5DADAC] ${
                    errors.message ? 'border-rose-300' : 'border-[#0D383B]/20'
                  }`}
                  placeholder={messagePlaceholder}
                />
                {errors.message && <p className="mt-1 text-sm text-rose-600">{errors.message.message}</p>}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-[#0D383B]/70">We’ll get back to you within 1–2 business days.</p>
              <button
                type="submit"
                disabled={disabled}
                className={`inline-flex items-center justify-center px-5 py-2.5 rounded-lg transition-all duration-300 border ${
                  disabled
                    ? 'bg-[#0D383B]/10 text-[#0D383B]/50 border-[#0D383B]/20'
                    : 'bg-[#0D383B] text-white border-[#0D383B] hover:scale-[1.02]'
                }`}
              >
                {isSubmitting ? 'Sending…' : 'Send message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection


