import { Atom, BrainCircuit, Database, Languages, Sparkles, type LucideIcon } from "lucide-react";
import python from "@/assets/tech/python.svg";
import java from "@/assets/tech/java.png";
import php from "@/assets/tech/php.svg";
import mysql from "@/assets/tech/mysql.svg";
import mongodb from "@/assets/tech/mongodb.svg";
import numpy from "@/assets/tech/numpy.svg";
import apacheSpark from "@/assets/tech/apachespark.svg";
import apacheHive from "@/assets/tech/apachehive.svg";
import apacheKafka from "@/assets/tech/apachekafka.svg";
import apacheHadoop from "@/assets/tech/apachehadoop.svg";
import aws from "@/assets/tech/aws.png";
import azure from "@/assets/tech/azure.png";
import googleCloud from "@/assets/tech/googlecloud.svg";
import tensorflow from "@/assets/tech/tensorflow.svg";
import powerbi from "@/assets/tech/powerbi.png";
import tableau from "@/assets/tech/tableau.png";
import git from "@/assets/tech/git.svg";

/* Client brief, 3 November 2026: a "Tools, Platforms & Technologies" overview for the SVU
   Overview page only. The list is the one verified on svudatascience.in; coverage varies by
   programme, so nothing here may imply that every item is taught in every programme.
   Marks keep their official shapes and colours; broad learning areas carry plain navy line
   icons instead, because they are subject areas rather than products. */

export type ToolItem = { name: string; logo?: string; icon?: LucideIcon };
export type ToolCategory = { label: string; items: ToolItem[] };

export const svuToolsIntro =
  "Explore the tools, platforms and emerging technologies featured across SVU\u2013Exafluence programmes. Coverage varies by programme and curriculum.";

export const svuToolCategories: ToolCategory[] = [
  { label: "Programming", items: [
    { name: "Python", logo: python },
    { name: "Java", logo: java },
    { name: "PHP", logo: php },
  ] },
  { label: "Databases & Querying", items: [
    { name: "MySQL", logo: mysql },
    { name: "MongoDB", logo: mongodb },
    { name: "SQL", icon: Database },
  ] },
  { label: "Data Processing & Engineering", items: [
    { name: "NumPy", logo: numpy },
    { name: "Apache Spark", logo: apacheSpark },
    { name: "Apache Hive", logo: apacheHive },
    { name: "Apache Kafka", logo: apacheKafka },
    { name: "Apache Hadoop", logo: apacheHadoop },
  ] },
  { label: "Cloud Platforms", items: [
    { name: "Amazon Web Services (AWS)", logo: aws },
    { name: "Microsoft Azure", logo: azure },
    { name: "Google Cloud", logo: googleCloud },
  ] },
  { label: "Machine Learning", items: [
    { name: "TensorFlow", logo: tensorflow },
  ] },
  { label: "Business Intelligence & Visualisation", items: [
    { name: "Power BI", logo: powerbi },
    { name: "Tableau", logo: tableau },
  ] },
  { label: "Version Control", items: [
    { name: "Git", logo: git },
  ] },
  { label: "Emerging Technologies & Learning Areas", items: [
    { name: "Artificial Intelligence", icon: BrainCircuit },
    { name: "Natural Language Processing (NLP)", icon: Languages },
    { name: "Generative AI", icon: Sparkles },
    { name: "Quantum Computing", icon: Atom },
  ] },
];
