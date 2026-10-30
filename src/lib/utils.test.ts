import { courseLevel } from "@/lib/constants";
import {
  formatCourseLevel,
  formatCourseLevelName,
  formatLevel,
} from "@/lib/utils";

describe("formatLevel", () => {
  it.each([
    ["Nivel 1 Jesus Esta Vivo", "NIVEL_1_JESUS_ESTA_VIVO"],
    ["Nivel 2 Jesus Nos Capacita", "NIVEL_2_JESUS_NOS_CAPACITA"],
    ["Nivel 3 Jesus Nos Envia", "NIVEL_3_JESUS_NOS_ENVIA"],
    ["Renacer Mujeres", "RENACER_MUJERES"],
    ["Renacer Hombres", "RENACER_HOMBRE"],
    ["Renacer Parejas", "RENACER_PAREJAS"],
  ])("maps the %s form label to %s", (label, backendEnum) => {
    expect(formatLevel(label)).toBe(backendEnum);
  });

  it("returns an unknown label unchanged", () => {
    expect(formatLevel("Advanced")).toBe("Advanced");
  });

  it("maps every courseLevel option to a distinct enum the display helpers understand", () => {
    const enums = courseLevel.map(formatLevel);

    expect(new Set(enums).size).toBe(courseLevel.length);
    for (const backendEnum of enums) {
      expect(formatCourseLevel(backendEnum)).not.toBe(backendEnum);
      expect(formatCourseLevelName(backendEnum)).not.toBe(backendEnum);
    }
  });
});
