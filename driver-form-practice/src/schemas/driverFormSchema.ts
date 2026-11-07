import { format } from "date-fns";
import { z } from "zod";

export const driverFormSchema = z
  .object({
    name: z.string().trim().min(1, "Informe o nome."),
    phone: z
      .string()
      .trim()
      .min(1, "Informe o telefone")
      .regex(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos"),
    is_active: z.boolean(),
    fee: z
      .string()
      .trim()
      .min(1, "Informe a taxa")
      .regex(/^\d+(,\d{1,2})?$/, "Valor inválido. Ex.: 8,50"),
    vehicle_id: z.number().nullable(),
    work_days: z.array(z.number()).min(1, "Escolha pelo menos um dia"),
    license_expires_at: z
      .string()
      .min(1, "Informe a data de vencimento da CNH")
      .refine((value) => {
        if (value === "") {
          return true;
        }
        const today = format(new Date(), "yyyy-MM-dd");

        return value >= today;
      }, "CNH vencida"),
    shift_start: z.string().min(1, "Informe o começo do turno"),
    shift_end: z.string().min(1, "Informe o fim do turno"),
  })
  // O .refine recebe 2 argumentos, separados por vírgula: (FUNÇÃO, OPÇÕES)
  .refine(
    // ===== 1º ARGUMENTO: a FUNÇÃO =====
    // Recebe o form inteiro e só responde: true = passa, false = barra.
    // Ela NÃO escolhe mensagem (isso é trabalho das opções, lá embaixo).
    (values) => {
      // CORREÇÃO 1: era `return;` (= undefined, que o Zod lê como falso e BARRA).
      // "Não é comigo": se algum horário tá vazio, deixo passar e quem
      // reclama é o .min(1) do próprio campo.
      // (sem .trim(): o ESCREVER do picker nunca escreve espaço)
      if (values.shift_start === "" || values.shift_end === "") {
        return true;
      }
      // CORREÇÃO 2: antes não tinha return aqui, então o turno CERTO também
      // terminava em undefined e era barrado.
      // CORREÇÃO 3: a regra é a positiva, "fim maior que começo".
      // Assim o turno de zero minutos ("08:00" até "08:00") também é barrado.
      //   "17:30" > "08:00" → true  → passa
      //   "08:00" > "17:30" → false → barra
      //   "08:00" > "08:00" → false → barra
      return values.shift_end > values.shift_start;
    },
    // ===== 2º ARGUMENTO: as OPÇÕES =====
    // CORREÇÃO 4: esse objeto estava DENTRO da função (por isso o erro do tsc).
    // Ele fica FORA, depois da vírgula.
    {
      error: "O fim do turno deve ser depois do começo", // o que o usuário lê
      path: ["shift_end"], // embaixo de qual input a mensagem aparece
    },
  );

export type DriverFormValues = z.infer<typeof driverFormSchema>;
