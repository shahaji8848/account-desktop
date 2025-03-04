"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface Option {
  id: number
  name: string
  [key: string]: any
}

interface SearchableSelectProps {
  options: Option[]
  value: string
  onChange: (value: string, option?: Option) => void
  placeholder: string
  disabled?: boolean
}

export default function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [internalValue, setInternalValue] = useState(value)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const filteredOptions = options.filter((option) => option.name.toLowerCase().includes(search.toLowerCase()))

  const selectedOption = options.find((opt) => opt.id.toString() === internalValue)

  useEffect(() => {
    setInternalValue(value)
  }, [value])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearch("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value
    setSearch(newSearch)
    setIsOpen(true)

    if (newSearch === "") {
      // Don't change the selection when input is cleared
      return
    }

    // Only update internal value if there's an exact match
    const exactMatch = options.find((option) => option.name.toLowerCase() === newSearch.toLowerCase())
    if (exactMatch) {
      setInternalValue(exactMatch.id.toString())
      onChange(exactMatch.id.toString(), exactMatch)
    }
  }

  return (
    <div className="position-relative" ref={wrapperRef}>
      <input
        type="text"
        className="form-control"
        value={search || selectedOption?.name || ""}
        onChange={handleInputChange}
        onFocus={() => {
          setIsOpen(true)
          setSearch("")
        }}
        placeholder={placeholder}
        disabled={disabled}
      />
      {isOpen && !disabled && (
        <div
          className="position-absolute w-100 mt-1 shadow bg-white border rounded z-1"
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          {filteredOptions.map((option) => (
            <div
              key={option.id}
              className="p-2 cursor-pointer hover:bg-light"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setInternalValue(option.id.toString())
                onChange(option.id.toString(), option)
                setSearch("")
                setIsOpen(false)
              }}
            >
              {option.name}
            </div>
          ))}
          {filteredOptions.length === 0 && <div className="p-2 text-muted">No results found</div>}
        </div>
      )}
    </div>
  )
}

