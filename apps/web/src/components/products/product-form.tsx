"use client";

import { PRODUCT_STATUSES, type ProductFormInput } from "@maquina/shared";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  createProductAction,
  deleteProductAction,
  updateProductAction,
} from "@/actions/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/utils";

type ProductFormProps = {
  mode: "create" | "edit";
  productId?: string;
  defaultValues?: Partial<ProductFormInput>;
};

export function ProductForm({ mode, productId, defaultValues }: ProductFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});

  function handleTitleBlur(title: string, currentSlug: string) {
    const slugInput = document.getElementById("slug") as HTMLInputElement | null;
    if (slugInput && (!currentSlug || slugInput.dataset.touched !== "true")) {
      slugInput.value = slugify(title);
    }
  }

  function onSubmit(formData: FormData) {
    startTransition(async () => {
      const result =
        mode === "create"
          ? await createProductAction(formData)
          : productId
            ? await updateProductAction(productId, formData)
            : { error: { _form: ["ID inválido"] } };

      if (result && "error" in result && result.error) {
        setErrors(result.error as Record<string, string[] | undefined>);
        return;
      }

      if (result && "success" in result) {
        router.refresh();
      }
    });
  }

  function onDelete() {
    if (!productId || !confirm("Excluir este produto permanentemente?")) return;
    startTransition(async () => {
      await deleteProductAction(productId);
    });
  }

  return (
    <form action={onSubmit} className="space-y-6 max-w-xl">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          name="title"
          required
          defaultValue={defaultValues?.title}
          onBlur={(e) => handleTitleBlur(e.target.value, defaultValues?.slug ?? "")}
        />
        {errors.title?.map((m) => (
          <p key={m} className="text-xs text-red-400">
            {m}
          </p>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug (URL pública /p/slug)</Label>
        <Input
          id="slug"
          name="slug"
          required
          defaultValue={defaultValues?.slug}
          onChange={(e) => {
            e.currentTarget.dataset.touched = "true";
          }}
        />
        {errors.slug?.map((m) => (
          <p key={m} className="text-xs text-red-400">
            {m}
          </p>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          name="description"
          rows={5}
          defaultValue={defaultValues?.description}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Preço (R$)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min={0}
            step="0.01"
            required
            defaultValue={defaultValues?.price ?? 0}
          />
          {errors.price?.map((m) => (
            <p key={m} className="text-xs text-red-400">
              {m}
            </p>
          ))}
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            defaultValue={defaultValues?.status ?? "draft"}
            className="flex h-9 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-100"
          >
            {PRODUCT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="thumbnail">Thumbnail (URL)</Label>
        <Input id="thumbnail" name="thumbnail" type="url" defaultValue={defaultValues?.thumbnail} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="checkoutUrl">Checkout Cakto (URL)</Label>
        <Input
          id="checkoutUrl"
          name="checkoutUrl"
          type="url"
          placeholder="https://pay.cakto.com.br/..."
          defaultValue={defaultValues?.checkoutUrl}
        />
        {errors.checkoutUrl?.map((m) => (
          <p key={m} className="text-xs text-red-400">
            {m}
          </p>
        ))}
      </div>

      {errors._form?.map((m) => (
        <p key={m} className="text-sm text-red-400">
          {m}
        </p>
      ))}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Salvando…" : mode === "create" ? "Criar produto" : "Salvar alterações"}
        </Button>
        <Link
          href="/products"
          className="inline-flex h-9 items-center rounded-md border border-zinc-800 bg-zinc-900 px-4 text-sm text-zinc-300 hover:bg-zinc-800"
        >
          Cancelar
        </Link>
        {mode === "edit" && productId && defaultValues?.slug && (
          <Link
            href={`/p/${defaultValues.slug}`}
            target="_blank"
            className="inline-flex h-9 items-center rounded-md px-4 text-sm text-zinc-400 hover:text-zinc-200"
          >
            Ver landing
          </Link>
        )}
        {mode === "edit" && productId && (
          <Button type="button" variant="destructive" onClick={onDelete} disabled={pending}>
            Excluir
          </Button>
        )}
      </div>
    </form>
  );
}
