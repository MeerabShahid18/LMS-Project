"use client";

import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { styles } from "../../../styles/styles";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

type Category = {
  _id: string;
  title: string;
};

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  active,
  setActive,
  setCourseInfo,
}) => {
  // =========================
  // Categories Data
  // =========================

  const { data } = useGetHeroDataQuery("Categories", {});

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (data?.layout?.categories) {
      setCategories(data.layout.categories);
    } else {
      setCategories([]);
    }
  }, [data]);

  // =========================
  // Drag State
  // =========================

  const [dragging, setDragging] = useState(false);

  // =========================
  // Form Submit
  // =========================

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(active + 1);
  };

  // =========================
  // File Change
  // =========================

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          setCourseInfo({
            ...courseInfo,
            thumbnail: reader.result,
          });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  // =========================
  // Drag Over
  // =========================

  const handleDragOver = (
    e: React.DragEvent<HTMLLabelElement>
  ) => {
    e.preventDefault();
    setDragging(true);
  };

  // =========================
  // Drag Leave
  // =========================

  const handleDragLeave = (
    e: React.DragEvent<HTMLLabelElement>
  ) => {
    e.preventDefault();
    setDragging(false);
  };

  // =========================
  // Drop File
  // =========================

  const handleDrop = (
    e: React.DragEvent<HTMLLabelElement>
  ) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          setCourseInfo({
            ...courseInfo,
            thumbnail: reader.result,
          });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-15 800px:mt-24">
      <form onSubmit={handleSubmit}>
        {/* =========================
            Course Name
        ========================== */}

        <div>
          <label
            htmlFor="name"
            className={`${styles.label}`}
          >
            Course Name
          </label>

          <input
            type="text"
            name="name"
            required
            value={courseInfo?.name ?? ""}
            onChange={(e) =>
              setCourseInfo({
                ...courseInfo,
                name: e.target.value,
              })
            }
            id="name"
            placeholder="MERN stack LMS platform with next 13"
            className={`${styles.input}`}
          />
        </div>

        <br />

        {/* =========================
            Course Description
        ========================== */}

        <div className="mb-5">
          <label
            htmlFor="description"
            className={`${styles.label}`}
          >
            Course Description
          </label>

          <textarea
            name="description"
            id="description"
            cols={30}
            rows={8}
            placeholder="Write something amazing..."
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo?.description ?? ""}
            onChange={(e) =>
              setCourseInfo({
                ...courseInfo,
                description: e.target.value,
              })
            }
          />
        </div>

        <br />

        {/* =========================
            Price
        ========================== */}

        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label
              htmlFor="price"
              className={`${styles.label}`}
            >
              Course Price
            </label>

            <input
              type="number"
              name="price"
              required
              value={courseInfo?.price ?? ""}
              onChange={(e) =>
                setCourseInfo({
                  ...courseInfo,
                  price: e.target.value,
                })
              }
              id="price"
              placeholder="29"
              className={`${styles.input}`}
            />
          </div>

          <div className="w-[50%]">
            <label
              htmlFor="estimatedPrice"
              className={`${styles.label}`}
            >
              Estimated Price
            </label>

            <input
              type="number"
              name="estimatedPrice"
              required
              value={courseInfo?.estimatedPrice ?? ""}
              onChange={(e) =>
                setCourseInfo({
                  ...courseInfo,
                  estimatedPrice: e.target.value,
                })
              }
              id="estimatedPrice"
              placeholder="79"
              className={`${styles.input}`}
            />
          </div>
        </div>

        <br />

        {/* =========================
            Tags and Categories
        ========================== */}

        <div className="flex justify-between w-full">
          {/* Tags */}

          <div className="w-[46%]">
            <label
              htmlFor="tags"
              className={`${styles.label}`}
            >
              Course Tags
            </label>

            <input
              type="text"
              name="tags"
              required
              value={courseInfo?.tags ?? ""}
              onChange={(e) =>
                setCourseInfo({
                  ...courseInfo,
                  tags: e.target.value,
                })
              }
              id="tags"
              placeholder="MERN,Next 13,Socket io,tailwind css,LMS"
              className={`${styles.input}`}
            />
          </div>

          {/* Categories */}

          <div className="w-[46%]">
            <label
              htmlFor="categories"
              className={styles.label}
            >
              Course Category
            </label>

            <select
              id="categories"
              name="categories"
              className={`${styles.input} dark:bg-slate-900 dark:text-white`}
              value={courseInfo?.categories ?? ""}
              onChange={(e) =>
                setCourseInfo({
                  ...courseInfo,
                  categories: e.target.value,
                })
              }
            >
              <option value="" disabled>
                Select a category
              </option>

              {categories.map((category) => (
                <option
                  key={category._id}
                  value={category.title}
                >
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <br />

        {/* =========================
            Level and Demo URL
        ========================== */}

        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label
              htmlFor="level"
              className={`${styles.label}`}
            >
              Course Level
            </label>

            <input
              type="text"
              name="level"
              value={courseInfo?.level ?? ""}
              required
              onChange={(e) =>
                setCourseInfo({
                  ...courseInfo,
                  level: e.target.value,
                })
              }
              id="level"
              placeholder="Beginner/Intermediate/Expert"
              className={`${styles.input}`}
            />
          </div>

          <div className="w-[50%]">
            <label
              htmlFor="demoUrl"
              className={`${styles.label}`}
            >
              Demo Url
            </label>

            <input
              type="text"
              name="demoUrl"
              required
              value={courseInfo?.demoUrl ?? ""}
              onChange={(e) =>
                setCourseInfo({
                  ...courseInfo,
                  demoUrl: e.target.value,
                })
              }
              id="demoUrl"
              placeholder="eer74fd"
              className={`${styles.input}`}
            />
          </div>
        </div>

        <br />

        {/* =========================
            Thumbnail Upload
        ========================== */}

        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />

          <label
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging
                ? "bg-blue-500"
                : "bg-transparent"
            }`}
            htmlFor="file"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
          >
            {courseInfo?.thumbnail ? (
              <Image
                src={courseInfo.thumbnail}
                alt="Course thumbnail"
                width={800}
                height={450}
                unoptimized
                className="max-h-full object-cover w-full"
              />
            ) : (
              <span>
                Drag and Drop Your Thumbnail here or click to Browse
              </span>
            )}
          </label>
        </div>

        <br />

        {/* =========================
            Next Button
        ========================== */}

        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;